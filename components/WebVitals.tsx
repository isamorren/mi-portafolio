'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { initWebVitals } from '@/lib/web-vitals'

// Cargar el display solo en desarrollo
const WebVitalsDisplay = dynamic(
  () => import('./WebVitalsDisplay'),
  { 
    ssr: false,
    loading: () => null 
  }
)

export default function WebVitals() {
  useEffect(() => {
    initWebVitals()
  }, [])

  return (
    <>
      {process.env.NODE_ENV === 'development' && <WebVitalsDisplay />}
    </>
  )
}