import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useReducedMotion, getAnimationConfig, getScrollAnimationConfig } from "@/hooks/useReducedMotion";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduce = useReducedMotion();
  const animConfig = getAnimationConfig(shouldReduce);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for floating elements
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, shouldReduce ? 0 : -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, shouldReduce ? 0 : -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, shouldReduce ? 0 : -150]);

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
        className={`absolute bottom-8 left-0 right-0 flex justify-center transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center cursor-pointer group"
          onClick={scrollToContent}
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={shouldReduce ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Hacer scroll para ver más contenido"
        >
          <span className="text-white/80 text-sm mb-2 font-serif-display group-hover:text-white transition-colors text-center">
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

      {/* Floating Film Reels with Parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Layer 1 - Slow moving film reels */}
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <motion.div
            className="absolute top-[15%] left-[10%] opacity-10"
            animate={shouldReduce ? {} : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#B4A7D6" strokeWidth="1" />
              <circle cx="40" cy="40" r="10" fill="#B4A7D6" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="35"
                  y="5"
                  width="10"
                  height="20"
                  fill="#B4A7D6"
                  transform={`rotate(${angle} 40 40)`}
                />
              ))}
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute bottom-[20%] right-[15%] opacity-10"
            animate={shouldReduce ? {} : { rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#E4C7D6" strokeWidth="1" />
              <circle cx="30" cy="30" r="8" fill="#E4C7D6" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="27"
                  y="5"
                  width="6"
                  height="15"
                  fill="#E4C7D6"
                  transform={`rotate(${angle} 30 30)`}
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Layer 2 - Medium speed hearts/pixels */}
        <motion.div style={{ y: y2 }} className="absolute inset-0">
          {/* Floating hearts */}
          <motion.div
            className="absolute top-[30%] right-[25%]"
            animate={shouldReduce ? {} : {
              y: [-10, 10, -10],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" className="text-[#E4C7D6]">
              <path
                d="M15 25C15 25 3 17 3 9C3 5 6 2 9.5 2C12 2 14 3.5 15 5C16 3.5 18 2 20.5 2C24 2 27 5 27 9C27 17 15 25 15 25Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute bottom-[40%] left-[20%]"
            animate={shouldReduce ? {} : {
              y: [10, -10, 10],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <svg width="25" height="25" viewBox="0 0 25 25" className="text-[#B4A7D6]">
              <path
                d="M12.5 22C12.5 22 2 15 2 8C2 4.5 4.5 2 7.5 2C9.5 2 11 3 12.5 4.5C14 3 15.5 2 17.5 2C20.5 2 23 4.5 23 8C23 15 12.5 22 12.5 22Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Layer 3 - Fast pixels/dots */}
        <motion.div style={{ y: y3 }} className="absolute inset-0">
          {/* Floating pixels like in logo */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i * 6)}%`,
                top: `${20 + ((i * 13) % 60)}%`
              }}
              animate={shouldReduce ? {} : {
                y: [-5, 5, -5],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-1 h-1 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? '#B4A7D6' : i % 3 === 1 ? '#E4C7D6' : '#6667AB',
                  boxShadow: `0 0 ${4 + (i % 3)}px currentColor`
                }}
              />
            </motion.div>
          ))}
          
          {/* Film strip perforations */}
          <div className="absolute left-0 top-0 bottom-0 w-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                className="absolute w-2 h-3 bg-white/5 rounded-sm"
                style={{ top: `${i * 5}%` }}
                animate={shouldReduce ? {} : { opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                className="absolute w-2 h-3 bg-white/5 rounded-sm right-0"
                style={{ top: `${i * 5}%` }}
                animate={shouldReduce ? {} : { opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 + 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;