import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const skills = [
    { 
      title: "Desarrollo Fullstack", 
      description: "React, Next.js, Node.js, Python",
      icon: "💻"
    },
    { 
      title: "Diseño UX/UI", 
      description: "Figma, Adobe Suite, Prototipado",
      icon: "🎨"
    },
    { 
      title: "Creadora de Agentes AI", 
      description: "OpenAI • Gemini • Claude • LangChain",
      icon: "🤖"
    },
    { 
      title: "Automatización Digital", 
      description: "APIs inteligentes • N8N",
      icon: "⚙️"
    }
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#F6F4F9]" />
      
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23322F68' fill-opacity='0.08'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='23' cy='29' r='0.5'/%3E%3Ccircle cx='37' cy='17' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Film grain texture */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Title */}
            <motion.h2
              className="font-serif-display text-5xl md:text-6xl lg:text-7xl text-[#1A1A2F] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Entre el <span className="italic">pixel</span>
              <br />
              y la poesía
            </motion.h2>

            {/* Narrative Text */}
            <motion.div
              className="space-y-6 text-lg md:text-xl text-[#1A1A2F] leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>
                Mi historia comenzó en el mundo de la <em className="italic font-serif-display">publicidad creativa</em>, 
                donde aprendí que cada mensaje debe tocar el alma antes que la mente. Durante años, 
                me dediqué a construir narrativas que conectaran marcas con emociones humanas profundas.
              </p>
              
              <p>
                Pero algo cambió cuando descubrí el <em className="italic font-serif-display">desarrollo web</em>. 
                Vi en el código una nueva forma de poesía: estructurada, lógica, pero infinitamente expresiva. 
                <strong className="font-serif-display"> La transición no fue un abandono, sino una evolución</strong> 
                - llevé conmigo la sensibilidad artística y la abracé con la precisión técnica.
              </p>
              
              <p>
                Hoy combino <em className="italic font-serif-display">ambos mundos</em>: 
                diseño interfaces que respiran, escribo código que cuenta historias, 
                y creo experiencias digitales donde la funcionalidad y la belleza danzan juntas. 
                Cada proyecto es una sinfonía donde la <strong className="font-serif-display">lógica técnica</strong> 
                se encuentra con la <strong className="font-serif-display">intuición creativa</strong>.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              className="border-l-4 border-[#6667AB] pl-6 italic text-xl text-[#1A1A2F]/80 font-serif-display"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              &ldquo;El mejor código es aquel que no solo funciona, sino que inspira.&rdquo;
            </motion.blockquote>
          </motion.div>

          {/* Right Column - Image and Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Vintage Portrait Placeholder */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-[#D9D7EC] to-[#E4C7D6] rounded-lg p-8 shadow-2xl transform rotate-2">
                <div className="aspect-[3/4] rounded-lg shadow-inner relative overflow-hidden">
                  {/* Portrait Image */}
                  <Image
                    src="/IMG_20210612_210729_806.jpg"
                    alt="Isabel Moreno - Retrato"
                    fill
                    className="object-cover object-top"
                    style={{
                      filter: 'contrast(1.1) brightness(1.05) sepia(0.15)',
                      objectPosition: 'center 20%'
                    }}
                  />
                  
                  {/* Vintage photo effects */}
                  <div className="absolute inset-0 bg-[#1A1A2F]/5 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2F]/10 to-transparent" />
                </div>
                
                {/* Photo corners */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#F6F4F9] shadow-md transform rotate-45" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#F6F4F9] shadow-md transform rotate-45" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#F6F4F9] shadow-md transform rotate-45" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#F6F4F9] shadow-md transform rotate-45" />
              </div>
            </motion.div>

            {/* Skills List */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="flex items-start gap-4 p-4 bg-[#F6F4F9]/60 rounded-lg shadow-sm border border-[#1A1A2F]/10"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-2xl flex-shrink-0">{skill.icon}</span>
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-[#1A1A2F] mb-1">
                      {skill.title}
                    </h4>
                    <p className="text-[#1A1A2F]/70">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
            >
              {/* Download CV Button */}
              <motion.a
                href="/CV ISABEL CRISTINA MORENO CONTRERAS.pdf?v=2025"
                download="CV_Isabel_Moreno.pdf"
                className="group relative bg-[#6667AB] text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden inline-block"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#B4A7D6] to-[#6667AB] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2 font-serif-display">
                  <span>📄</span>
                  <span>Descargar CV</span>
                </div>
                {/* Vintage luggage tag effect */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E4C7D6] rounded-full transform rotate-12" />
              </motion.a>

              {/* LinkedIn Button */}
              <motion.a
                href="https://www.linkedin.com/in/isabel-moreno-dev-fullstack-frontend-designer/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#F6F4F9] border-2 border-[#6667AB] text-[#6667AB] px-6 py-3 rounded-lg shadow-lg hover:bg-[#6667AB] hover:text-white transition-all duration-300 overflow-hidden"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex items-center gap-2 font-serif-display">
                  <span>🔗</span>
                  <span>Ver LinkedIn</span>
                </div>
                {/* Vintage luggage tag effect */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E4C7D6] rounded-full transform rotate-12" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-[#6667AB] opacity-10 text-8xl font-serif-display transform rotate-12">
        ∞
      </div>
      <div className="absolute bottom-20 left-10 text-[#6667AB] opacity-10 text-6xl font-serif-display transform -rotate-6">
        ✨
      </div>
    </section>
  );
};

export default About;