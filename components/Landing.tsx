import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useReducedMotion, getAnimationConfig, getScrollAnimationConfig } from "@/hooks/useReducedMotion";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduce = useReducedMotion();
  const animConfig = getAnimationConfig(shouldReduce);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    const heroSection = document.querySelector('#hero-section');
    heroSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden" role="banner" aria-label="Sección principal de bienvenida">
      {/* Vintage Film Background */}
      <div className="absolute inset-0">
        {/* Simulated vintage film background with CSS patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#B4A7D6] via-[#D9D7EC] to-[#F6F4F9] opacity-60" />
        
        {/* Sepia-blue vintage overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(102, 103, 171, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(228, 199, 214, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(102, 103, 171, 0.1) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Film grain texture */}
        <div 
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Additional vintage effects */}
        <div className="absolute inset-0" style={{
          background: `
            linear-gradient(45deg, rgba(26, 26, 47, 0.1) 0%, transparent 25%),
            linear-gradient(-45deg, rgba(50, 47, 104, 0.1) 0%, transparent 25%)
          `
        }} />
        
        {/* Translucent overlay for text contrast */}
        <div className="absolute inset-0 bg-[#1A1A2F]/85" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Main Title */}
        <motion.h1
          className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          Diseño experiencias
          <br />
          <span className="italic">digitales con alma.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/90 italic mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
        >
&ldquo;Entre el código y la emoción, construyo belleza funcional.&rdquo;
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mb-16"
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={shouldReduce ? { duration: 0.2 } : { duration: 1, delay: 1.5 }}
        >
          <button
            onClick={scrollToContent}
            className={`btn-cinematic group relative px-8 py-4 bg-[#6667AB] text-white font-serif-display text-lg rounded-2xl shadow-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#6667AB]/50`}
            aria-label="Explorar el contenido del portfolio"
          >
            {/* Gradient overlay for hover */}
            <div className={`absolute inset-0 bg-gradient-to-r from-[#B4A7D6] to-[#6667AB] opacity-0 group-hover:opacity-100 transition-opacity ${shouldReduce ? 'duration-100' : 'duration-300'}`} />
            
            {/* Pulse animation */}
            <div className={`absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 ${shouldReduce ? '' : 'group-hover:animate-pulse'}`} />
            
            <span className={`relative z-10 group-hover:text-white transition-colors ${shouldReduce ? 'duration-100' : 'duration-300'}`}>
              Explorar mi universo
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          onClick={scrollToContent}
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={shouldReduce ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Hacer scroll para ver más contenido"
        >
          <span className="text-white/80 text-sm mb-2 font-serif-display group-hover:text-white transition-colors">
            Scroll
          </span>
          
          {/* Animated Arrow */}
          <motion.svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white/80 group-hover:text-white transition-colors"
            whileHover={shouldReduce ? {} : { scale: 1.1 }}
          >
            <motion.path 
              d="M12 5L12 19M12 19L5 12M12 19L19 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Landing;