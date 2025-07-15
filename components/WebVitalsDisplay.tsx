'use client'

import { useState, useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'
import { motion, AnimatePresence } from 'framer-motion'

interface VitalData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

const thresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
}

export default function WebVitalsDisplay() {
  const [vitals, setVitals] = useState<VitalData[]>([])
  const [isMinimized, setIsMinimized] = useState(true)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const updateVital = (name: string, value: number) => {
      const threshold = thresholds[name as keyof typeof thresholds]
      let rating: 'good' | 'needs-improvement' | 'poor' = 'good'
      
      if (threshold) {
        if (value > threshold.needsImprovement) {
          rating = 'poor'
        } else if (value > threshold.good) {
          rating = 'needs-improvement'
        }
      }

      setVitals(prev => {
        const existing = prev.findIndex(v => v.name === name)
        const newVital = { name, value, rating }
        
        if (existing >= 0) {
          const updated = [...prev]
          updated[existing] = newVital
          return updated
        }
        
        return [...prev, newVital]
      })
    }

    onCLS((metric) => updateVital('CLS', metric.value))
    onFCP((metric) => updateVital('FCP', metric.value))
    onLCP((metric) => updateVital('LCP', metric.value))
    onTTFB((metric) => updateVital('TTFB', metric.value))
    onINP((metric) => updateVital('INP', metric.value))
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return '#0cce6b'
      case 'needs-improvement': return '#ffa400'
      case 'poor': return '#ff4e42'
      default: return '#999'
    }
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 font-mono text-xs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg shadow-lg hover:bg-gray-800/90 transition-colors"
      >
        {isMinimized ? '📊 Web Vitals' : '✕ Close'}
      </button>
      
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg p-3 min-w-[200px]"
          >
            <h3 className="text-white font-semibold mb-2">Core Web Vitals</h3>
            <div className="space-y-1">
              {vitals.map((vital) => (
                <div key={vital.name} className="flex justify-between items-center">
                  <span className="text-gray-300">{vital.name}:</span>
                  <span 
                    style={{ color: getRatingColor(vital.rating) }}
                    className="font-semibold"
                  >
                    {vital.name === 'CLS' 
                      ? vital.value.toFixed(3)
                      : `${vital.value.toFixed(0)}ms`
                    }
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-gray-400 text-[10px]">
                Development only • Console for details
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}