import { useEffect, useState } from 'react';

/**
 * Custom hook that detects if the user has enabled reduced motion preference
 * @returns {boolean} shouldReduce - true if user prefers reduced motion
 */
export const useReducedMotion = (): boolean => {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial state
    setShouldReduce(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setShouldReduce(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return shouldReduce;
};

/**
 * Utility function to get animation settings based on reduced motion preference
 * @param shouldReduce - boolean indicating if motion should be reduced
 * @returns object with animation configurations
 */
export const getAnimationConfig = (shouldReduce: boolean) => {
  if (shouldReduce) {
    return {
      // Minimal or no animation
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 },
      // Disable complex animations
      whileHover: {},
      whileTap: {},
      // No infinite animations
      repeat: 0,
      // No parallax
      parallax: false,
      // No rotation
      rotate: 0,
      // No scale effects
      scale: 1,
    };
  }

  return {
    // Full animations
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: 'easeOut' },
    // Allow hover effects
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    // Allow infinite animations
    repeat: Infinity,
    // Allow parallax
    parallax: true,
    // Allow rotation
    rotate: 360,
    // Allow scale effects
    scale: 1.1,
  };
};

/**
 * Utility function for scroll-triggered animations
 * @param shouldReduce - boolean indicating if motion should be reduced
 * @returns viewport and animation configuration for scroll animations
 */
export const getScrollAnimationConfig = (shouldReduce: boolean) => {
  if (shouldReduce) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: '0px' },
      transition: { duration: 0.2 },
    };
  }

  return {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.8, ease: 'easeOut' },
  };
};

/**
 * Utility function for continuous/infinite animations
 * @param shouldReduce - boolean indicating if motion should be reduced
 * @returns animation configuration for continuous animations
 */
export const getContinuousAnimationConfig = (shouldReduce: boolean) => {
  if (shouldReduce) {
    return {
      animate: {},
      transition: { duration: 0 },
    };
  }

  return {
    animate: { rotate: 360 },
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
    },
  };
};