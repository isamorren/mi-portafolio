'use client'

import { useEffect, useRef } from 'react'
import { measureComponentLoad, reportCustomMetric } from '@/lib/web-vitals'

interface PerformanceOptions {
  trackVisibility?: boolean
  trackInteraction?: boolean
  threshold?: number
}

export function usePerformanceTracking(
  componentName: string,
  options: PerformanceOptions = {}
) {
  const { trackVisibility = true, trackInteraction = false, threshold = 0.5 } = options
  const elementRef = useRef<HTMLElement>(null)
  const hasBeenVisible = useRef(false)
  const mountTime = useRef(performance.now())
  const stopMeasuring = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Medir tiempo de montaje
    stopMeasuring.current = measureComponentLoad(componentName)

    // Cleanup al desmontar
    return () => {
      if (stopMeasuring.current) {
        stopMeasuring.current()
      }
    }
  }, [componentName])

  useEffect(() => {
    if (!trackVisibility || !elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible.current) {
            hasBeenVisible.current = true
            const visibilityTime = performance.now() - mountTime.current
            
            reportCustomMetric(`${componentName}_time_to_visible`, visibilityTime)
            
            if (process.env.NODE_ENV === 'development') {
              console.log(
                `%c👁 ${componentName} became visible after ${visibilityTime.toFixed(2)}ms`,
                'color: #8b5cf6;'
              )
            }
          }
        })
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [componentName, trackVisibility, threshold])

  const trackEvent = (eventName: string) => {
    if (!trackInteraction) return

    const eventTime = performance.now() - mountTime.current
    reportCustomMetric(`${componentName}_${eventName}`, eventTime)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c🎯 ${componentName} event "${eventName}" at ${eventTime.toFixed(2)}ms`,
        'color: #f59e0b;'
      )
    }
  }

  return {
    ref: elementRef,
    trackEvent,
  }
}