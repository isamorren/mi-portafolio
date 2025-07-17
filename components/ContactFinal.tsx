import { motion } from "framer-motion";

const ContactFinal = () => {
  return (
    <section id="contact-final" className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background image - American road/sunset */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='1920' height='1080' viewBox='0 0 1920 1080' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='sunset' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B;stop-opacity:0.3'/%3E%3Cstop offset='30%25' style='stop-color:%23FFE66D;stop-opacity:0.2'/%3E%3Cstop offset='60%25' style='stop-color:%234ECDC4;stop-opacity:0.1'/%3E%3Cstop offset='100%25' style='stop-color:%231A535C;stop-opacity:0.4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23sunset)'/%3E%3Cpath d='M0 800 Q480 700 960 800 T1920 800 L1920 1080 L0 1080 Z' fill='%231A1A2F' opacity='0.3'/%3E%3Cpath d='M0 900 Q480 850 960 900 T1920 900 L1920 1080 L0 1080 Z' fill='%231A1A2F' opacity='0.5'/%3E%3C/svg%3E")`,
            filter: 'saturate(0.3) contrast(1.2)'
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A1A2F] opacity-70" />
        
        {/* Film grain effect */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">
            <span className="font-script text-5xl md:text-7xl text-white block mb-2">
              ¿Creamos algo
            </span>
            <span className="font-serif-display text-6xl md:text-8xl text-white italic">
              eterno
            </span>
            <span className="font-script text-5xl md:text-7xl text-white block mt-2">
              juntos?
            </span>
          </h2>
          
          <motion.div 
            className="w-32 h-0.5 bg-white/30 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Social links - Vintage stickers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8"
        >
          {/* LinkedIn Sticker */}
          <motion.a
            href="https://www.linkedin.com/in/isabel-moreno-dev-fullstack-frontend-designer/"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-cinematic relative group"
            whileHover={{ rotate: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              {/* Sticker base */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#B4A7D6] to-[#6667AB] rounded-full shadow-lg relative overflow-hidden border-4 border-white">
                {/* Vintage texture */}
                <div className="absolute inset-0 opacity-30" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughPaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='5' result='noise' seed='1'/%3E%3CfeDiffuseLighting in='noise' lighting-color='white' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughPaper)'/%3E%3C/svg%3E")`
                  }}
                />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#322F68]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                
                {/* Stamp effect */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#E4C7D6] rounded-full flex items-center justify-center transform rotate-12 border-2 border-white">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
              </div>
              
              {/* Label */}
              <motion.div 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: -10 }}
                whileHover={{ y: 0 }}
              >
                <p className="text-white text-sm font-script whitespace-nowrap">LinkedIn</p>
              </motion.div>
            </div>
          </motion.a>

          {/* GitHub Sticker */}
          <motion.a
            href="https://github.com/isamorren"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-cinematic relative group"
            whileHover={{ rotate: 5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              {/* Sticker base */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#D9D7EC] to-[#B4A7D6] rounded-full shadow-lg relative overflow-hidden border-4 border-white">
                {/* Vintage texture */}
                <div className="absolute inset-0 opacity-30" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughPaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='5' result='noise' seed='2'/%3E%3CfeDiffuseLighting in='noise' lighting-color='white' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughPaper)'/%3E%3C/svg%3E")`
                  }}
                />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#1A1A2F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                
                {/* Stamp effect */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#6667AB] rounded-full flex items-center justify-center transform rotate-12 border-2 border-white">
                  <span className="text-white text-xs font-bold">git</span>
                </div>
              </div>
              
              {/* Label */}
              <motion.div 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: -10 }}
                whileHover={{ y: 0 }}
              >
                <p className="text-white text-sm font-script whitespace-nowrap">GitHub</p>
              </motion.div>
            </div>
          </motion.a>

          {/* Email Sticker */}
          <motion.a
            href="mailto:isamoreoc08@gmail.com?subject=Colaboremos%20juntos&body=Hola%20Isa,%0A%0ATe%20escribe%20%7BTu%20nombre%7D%20y%20estoy%20interesado(a)%20en%20los%20siguientes%20servicios:%0A%0A-%20%0A-%20%0A%0A¿Qué%20espacio%20tienes%20disponible%20para%20una%20reunión?%0A%0ASaludos,"
            className="glow-cinematic relative group"
            whileHover={{ rotate: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              {/* Sticker base */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#E4C7D6] to-[#D9D7EC] rounded-full shadow-lg relative overflow-hidden border-4 border-white">
                {/* Vintage texture */}
                <div className="absolute inset-0 opacity-30" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roughPaper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='5' result='noise' seed='3'/%3E%3CfeDiffuseLighting in='noise' lighting-color='white' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roughPaper)'/%3E%3C/svg%3E")`
                  }}
                />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#322F68]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Stamp effect */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#B4A7D6] rounded-full flex items-center justify-center transform rotate-12 border-2 border-white">
                  <span className="text-white text-xs font-bold">@</span>
                </div>
              </div>
              
              {/* Label */}
              <motion.div 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ y: -10 }}
                whileHover={{ y: 0 }}
              >
                <p className="text-white text-sm font-script whitespace-nowrap">Email</p>
              </motion.div>
            </div>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" fill="white">
            <path d="M50 10 L61 39 L90 39 L67 56 L78 85 L50 68 L22 85 L33 56 L10 39 L39 39 Z" />
          </svg>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFinal;