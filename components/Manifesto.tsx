import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Manifesto = () => {
  const verses = [
    "Creo en la tecnología que conmueve.",
    "En interfaces que respiran y fluyen.",
    "En diseño que no solo funciona, sino que se siente.",
    "Trabajo con intención, elegancia y lógica.",
    "Porque la belleza también puede compilarse."
  ];

  const [currentVerse, setCurrentVerse] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentVerse >= verses.length) return;

    const currentText = verses[currentVerse];
    
    if (currentCharIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (currentVerse < verses.length - 1) {
          setCurrentVerse(currentVerse + 1);
          setCurrentCharIndex(0);
          setDisplayedText("");
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentVerse, verses]);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[#1A1A2F]" />
      
      {/* Paper texture */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.05'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='70' cy='70' r='1'/%3E%3Ccircle cx='90' cy='90' r='1'/%3E%3Ccircle cx='25' cy='75' r='0.5'/%3E%3Ccircle cx='75' cy='25' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Film grain */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Subtle blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(26, 26, 47, 0.4) 100%)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif-display text-5xl md:text-7xl text-white mb-4">
            Mi <span className="font-script italic">manifiesto</span> digital
          </h2>
          <div className="w-32 h-0.5 bg-white/30 mx-auto" />
        </motion.div>

        {/* Verses with typewriter effect */}
        <div className="space-y-12 max-w-3xl mx-auto">
          {verses.map((verse, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index <= currentVerse ? 1 : 0 
              }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Verse text */}
              <div className="text-center mb-6">
                <p className={`
                  ${index % 2 === 0 ? 'font-script text-3xl md:text-4xl' : 'font-serif-display text-2xl md:text-3xl italic'}
                  text-white leading-relaxed tracking-wide
                `}>
                  {index < currentVerse ? verse : 
                   index === currentVerse ? displayedText : ''}
                  {index === currentVerse && currentCharIndex < verse.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>
              </div>
              
              {/* Film strip decoration between verses */}
              {index < verses.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: index < currentVerse ? '100%' : '0%' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mx-auto"
                >
                  <div className="h-3 bg-white/10 relative overflow-hidden">
                    {/* Film perforations */}
                    <div className="absolute inset-0 flex justify-between items-center px-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-white/20 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Vintage flower decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, delay: 3 }}
          viewport={{ once: true }}
          className="absolute bottom-10 right-10"
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Rose petals */}
            <g opacity="0.6">
              <path d="M60 30 Q45 45 30 60 Q45 75 60 60 Q75 45 90 60 Q75 75 60 60 Q45 45 60 30 Z" 
                    fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1"/>
              <path d="M60 40 Q50 50 40 60 Q50 70 60 60 Q70 50 80 60 Q70 70 60 60 Q50 50 60 40 Z" 
                    fill="white" fillOpacity="0.3" stroke="white" strokeWidth="0.5"/>
            </g>
            {/* Stem */}
            <path d="M60 60 L60 90" stroke="white" strokeWidth="2" opacity="0.4"/>
            {/* Leaves */}
            <path d="M60 75 Q50 70 45 75 Q50 80 60 75" fill="white" fillOpacity="0.2"/>
            <path d="M60 80 Q70 75 75 80 Q70 85 60 80" fill="white" fillOpacity="0.2"/>
          </svg>
        </motion.div>

        {/* Decorative film reel corners */}
        <div className="absolute top-10 left-10 w-16 h-16 opacity-10">
          <div className="w-full h-full rounded-full border-4 border-white relative">
            <div className="absolute inset-2 rounded-full border-2 border-white" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="absolute top-10 right-10 w-16 h-16 opacity-10">
          <div className="w-full h-full rounded-full border-4 border-white relative">
            <div className="absolute inset-2 rounded-full border-2 border-white" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;