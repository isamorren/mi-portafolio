import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

type WebVitalsMetric = Metric & {
  isWarning?: boolean
  isCritical?: boolean
}

// Umbrales para Web Vitals según Google
const thresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 },
}

// Función para evaluar el rendimiento
function evaluateMetric(name: string, value: number): { rating: string; color: string } {
  const threshold = thresholds[name as keyof typeof thresholds]
  if (!threshold) return { rating: 'unknown', color: '#999' }

  if (value <= threshold.good) {
    return { rating: 'good', color: '#0cce6b' }
  } else if (value <= threshold.needsImprovement) {
    return { rating: 'needs-improvement', color: '#ffa400' }
  } else {
    return { rating: 'poor', color: '#ff4e42' }
  }
}

// Función para enviar métricas
export function sendToAnalytics(metric: WebVitalsMetric) {
  const { rating, color } = evaluateMetric(metric.name, metric.value)
  
  // Log detallado en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.group(`%c⚡ Web Vitals: ${metric.name}`, `color: ${color}; font-weight: bold;`)
    console.log('Value:', metric.value.toFixed(2))
    console.log('Rating:', rating)
    console.log('ID:', metric.id)
    console.log('Navigation Type:', metric.navigationType)
    
    if (metric.entries && metric.entries.length > 0) {
      console.log('Entries:', metric.entries)
    }
    
    console.groupEnd()
  } else {
    // Log simplificado en producción
    console.log(`Web Vitals [${metric.name}]: ${metric.value.toFixed(2)} (${rating})`)
  }

  // Enviar a Vercel Analytics si está disponible
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }

  // Enviar a Vercel Speed Insights si está disponible
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('event', 'Web Vitals', {
      [metric.name]: metric.value,
    })
  }
}

// Función para inicializar Web Vitals
export function initWebVitals() {
  if (typeof window === 'undefined') return

  // Registrar todas las métricas
  onCLS(sendToAnalytics)
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
  onINP(sendToAnalytics)

  // Log inicial en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '%c🚀 Web Vitals initialized',
      'color: #9333ea; font-weight: bold; font-size: 14px;'
    )
    console.log(
      '%cTracking: LCP, CLS, TTFB, INP, FCP',
      'color: #6b7280; font-size: 12px;'
    )
  }
}

// Función para reportar métricas personalizadas
export function reportCustomMetric(name: string, value: number) {
  const metric: WebVitalsMetric = {
    name,
    value,
    delta: value,
    id: `custom-${Date.now()}`,
    navigationType: 'navigate',
    rating: 'good',
    entries: [],
  }
  
  sendToAnalytics(metric)
}

// Helper para medir el tiempo de carga de componentes
export function measureComponentLoad(componentName: string) {
  const startTime = performance.now()
  
  return () => {
    const loadTime = performance.now() - startTime
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c⏱ ${componentName} loaded in ${loadTime.toFixed(2)}ms`,
        `color: ${loadTime < 100 ? '#0cce6b' : loadTime < 300 ? '#ffa400' : '#ff4e42'};`
      )
    }
  }
}

// Definir tipos globales para TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (...args: any[]) => void
  }
}