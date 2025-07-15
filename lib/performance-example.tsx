// Ejemplo de uso del hook usePerformanceTracking en tus componentes

import { usePerformanceTracking } from '@/hooks/usePerformanceTracking'

// Ejemplo 1: Tracking básico de componente
export function HeroSection() {
  const { ref } = usePerformanceTracking('HeroSection')
  
  return (
    <section ref={ref}>
      {/* Tu contenido del Hero */}
    </section>
  )
}

// Ejemplo 2: Tracking con eventos de interacción
export function InteractiveGlobe() {
  const { ref, trackEvent } = usePerformanceTracking('Globe', {
    trackVisibility: true,
    trackInteraction: true,
  })
  
  const handleGlobeClick = () => {
    trackEvent('globe_clicked')
    // Tu lógica del click
  }
  
  const handleGlobeLoad = () => {
    trackEvent('globe_loaded')
    // Tu lógica de carga
  }
  
  return (
    <div ref={ref}>
      <Globe 
        onClick={handleGlobeClick}
        onLoad={handleGlobeLoad}
      />
    </div>
  )
}

// Ejemplo 3: Tracking de lazy-loaded components
export function LazyProject() {
  const { ref, trackEvent } = usePerformanceTracking('ProjectCard', {
    threshold: 0.1, // Se registra cuando el 10% es visible
  })
  
  useEffect(() => {
    // Simular carga de datos
    fetchProjectData().then(() => {
      trackEvent('data_loaded')
    })
  }, [])
  
  return (
    <article ref={ref}>
      {/* Contenido del proyecto */}
    </article>
  )
}