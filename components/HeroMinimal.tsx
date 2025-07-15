import { motion } from "framer-motion";

const HeroMinimal = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-[#E4C7D6] opacity-20">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor">
          <path d="M60 10 L70 40 L100 40 L75 60 L85 90 L60 70 L35 90 L45 60 L20 40 L50 40 Z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-10 text-[#6667AB] opacity-20 rotate-12">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M50 20 Q30 50 50 80 Q70 50 50 20" fill="currentColor"/>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center max-w-5xl"
      >
        <motion.p 
          className="font-script text-2xl md:text-3xl text-[#6667AB] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Lost in a dream
        </motion.p>
        
        <h1 className="font-serif-display text-7xl md:text-9xl mb-6 text-shadow-vintage">
          <span className="italic text-[#E4C7D6]">Isabel</span>
          <br />
          <span className="text-[#1A1A2F]">Moreno</span>
        </h1>
        
        <motion.div 
          className="w-24 h-0.5 bg-[#B4A7D6] mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
        
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed italic text-[#322F68]/80 mb-12">
          Desarrolladora web que transforma código en experiencias poéticas, 
          donde la tecnología se encuentra con el arte y cada proyecto cuenta 
          una historia de belleza digital atemporal
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.a 
            href="#projects" 
            className="group relative px-8 py-3 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-[#E4C7D6] transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-300"></span>
            <span className="relative text-white font-serif-display">Descubre mi trabajo</span>
          </motion.a>
          
          <motion.a 
            href="#contact-final" 
            className="px-8 py-3 border-2 border-[#6667AB] text-[#6667AB] hover:bg-[#6667AB] hover:text-[#F6F4F9] transition-colors duration-300 font-serif-display"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Escríbeme
          </motion.a>
        </div>
      </motion.div>

      {/* Vintage film strip decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1A1A2F]/5 flex items-center justify-center gap-4 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-8 h-12 bg-[#1A1A2F]/10 rounded-sm"></div>
        ))}
      </div>
    </section>
  );
};

export default HeroMinimal;