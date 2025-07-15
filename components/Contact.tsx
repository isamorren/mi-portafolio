import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background with vintage texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--cream)] via-[var(--blush)]/20 to-[var(--rose)]/30" />
        
        {/* Paper texture */}
        <div 
          className="absolute inset-0 opacity-15 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3Ccircle cx='23' cy='29' r='0.5'/%3E%3Ccircle cx='37' cy='17' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Vintage stains */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-[var(--wine)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--rose)]/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            className="font-script text-3xl text-[var(--wine)] mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
          >
            "Video Games"
          </motion.p>
          
          <motion.h2
            className="font-serif-display text-5xl md:text-7xl text-[var(--navy)] mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            ¿Creamos algo <span className="italic text-[var(--rose)]">eterno</span> juntos?
          </motion.h2>
          
          <motion.div 
            className="w-24 h-0.5 bg-[var(--gold)] mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  className="w-full p-4 bg-white/60 border-2 border-[var(--rose)]/30 rounded-lg font-serif-display text-lg text-[var(--navy)] placeholder-[var(--navy)]/50 focus:border-[var(--rose)] focus:outline-none focus:bg-white/80 transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Tu correo electrónico"
                  className="w-full p-4 bg-white/60 border-2 border-[var(--rose)]/30 rounded-lg font-serif-display text-lg text-[var(--navy)] placeholder-[var(--navy)]/50 focus:border-[var(--rose)] focus:outline-none focus:bg-white/80 transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntame sobre tu proyecto soñado..."
                  rows={6}
                  className="w-full p-4 bg-white/60 border-2 border-[var(--rose)]/30 rounded-lg font-serif-display text-lg text-[var(--navy)] placeholder-[var(--navy)]/50 focus:border-[var(--rose)] focus:outline-none focus:bg-white/80 transition-all duration-300 resize-none"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
              </div>

              {/* Polaroid Submit Button */}
              <motion.div
                className="flex justify-center mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="relative group"
                >
                  {/* Polaroid frame */}
                  <div className="bg-white p-6 pb-12 rounded-lg shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300 border-4 border-white">
                    <div className="bg-gradient-to-br from-[var(--rose)] to-[var(--blush)] h-32 w-48 rounded-sm mb-4 flex items-center justify-center">
                      <span className="font-serif-display text-white text-xl font-bold">
                        Enviar mensaje
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-script text-lg text-[var(--navy)]">Let's create magic ✨</p>
                    </div>
                  </div>
                  
                  {/* Vintage tape effect */}
                  <div className="absolute -top-2 left-8 w-16 h-4 bg-[var(--gold)]/60 rounded-sm transform -rotate-12"></div>
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Personal Touch */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-[var(--rose)]/20">
              <h3 className="font-serif-display text-2xl text-[var(--navy)] mb-4 italic">
                Conversemos sobre tu visión
              </h3>
              <p className="text-lg text-[var(--navy)]/70 leading-relaxed mb-6">
                Cada proyecto comienza con una historia. Me encanta escuchar sobre tus ideas, 
                sueños digitales y cómo podemos transformarlos en experiencias memorables.
              </p>
              
              {/* Response time */}
              <div className="flex items-center gap-3 text-[var(--wine)]">
                <div className="w-2 h-2 bg-[var(--rose)] rounded-full animate-pulse"></div>
                <span className="text-sm font-serif-display">Respuesta en menos de 24 horas</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="font-serif-display text-xl text-[var(--navy)] italic">
                Conectemos en otros universos
              </h4>
              
              <div className="flex gap-6">
                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/isabel-moreno-dev-fullstack-frontend-designer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center border-2 border-[var(--rose)]/30 group-hover:border-[var(--rose)] transition-all duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-[var(--navy)] group-hover:text-[var(--rose)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-script text-[var(--navy)] opacity-0 group-hover:opacity-100 transition-opacity">
                    LinkedIn
                  </span>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/isamorren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 bg-white/60 rounded-full flex items-center justify-center border-2 border-[var(--rose)]/30 group-hover:border-[var(--rose)] transition-all duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-[var(--navy)] group-hover:text-[var(--rose)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-script text-[var(--navy)] opacity-0 group-hover:opacity-100 transition-opacity">
                    GitHub
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Closing Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="font-serif-display text-4xl md:text-5xl text-[var(--navy)] italic">
            Heaven is a place
            <br />
            <span className="text-[var(--rose)]">on earth with you</span>
          </p>
          
          {/* Subtle neon glow */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-[var(--rose)] via-[var(--blush)] to-[var(--sky)]"></div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 text-[var(--gold)] opacity-10 text-6xl font-script transform rotate-12">
          Dreams
        </div>
        
        <div className="absolute bottom-20 left-10 text-[var(--rose)] opacity-10 text-5xl font-script transform -rotate-6">
          Forever
        </div>
      </div>
    </section>
  );
};

export default Contact;