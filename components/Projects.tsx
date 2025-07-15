import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projectsPerPage = 3;

  const projects = [
    {
      id: 1,
      title: "E-commerce ético",
      verse: "Donde el consumo consciente encontró su hogar digital",
      problem: "Marcas sostenibles sin vitrina",
      solution: "Marketplace con alma verde",
      tools: ["React", "Spring Boot", "PostgreSQL", "Stripe"],
      learning: "El comercio puede ser un acto de amor al planeta",
      gradient: "from-[#E4C7D6] to-[#B4A7D6]",
      icon: "🌱",
      color: "#6667AB",
      link: "https://github.com/isabel-moreno22/eco-marketplace",
      techIcons: {
        "React": "⚛️",
        "Spring Boot": "🍃",
        "PostgreSQL": "🐘",
        "Stripe": "💳"
      }
    },
    {
      id: 2,
      title: "Gestión de talentos",
      verse: "Una sinfonía entre empresas y creativos",
      problem: "Conexiones perdidas en el ruido",
      solution: "Plataforma que armoniza perfiles",
      tools: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
      learning: "La tecnología humaniza cuando escucha",
      gradient: "from-[#B4A7D6] to-[#D9D7EC]",
      icon: "✨",
      color: "#322F68",
      link: "https://github.com/isabel-moreno22/talent-hub",
      techIcons: {
        "Next.js": "▲",
        "Node.js": "🟢",
        "MongoDB": "🍃",
        "Socket.io": "🔌"
      }
    },
    {
      id: 3,
      title: "Sistema de reservas",
      verse: "El tiempo ordenado en compases perfectos",
      problem: "Agendas caóticas, citas perdidas",
      solution: "Calendario inteligente y fluido",
      tools: ["Vue.js", "Django", "Redis", "PostgreSQL"],
      learning: "La organización es un arte cuando es intuitiva",
      gradient: "from-[#D9D7EC] to-[#E4C7D6]",
      icon: "📅",
      color: "#6667AB",
      link: "https://github.com/isabel-moreno22/smart-booking",
      techIcons: {
        "Vue.js": "💚",
        "Django": "🎸",
        "Redis": "📍",
        "PostgreSQL": "🐘"
      }
    },
    {
      id: 4,
      title: "Red social educativa",
      verse: "Aprendizaje compartido en armonía digital",
      problem: "Conocimiento aislado en silos",
      solution: "Comunidad que crece aprendiendo",
      tools: ["React", "GraphQL", "Node.js", "AWS"],
      learning: "Enseñar es aprender dos veces",
      gradient: "from-[#E4C7D6] to-[#D9D7EC]",
      icon: "📚",
      color: "#322F68",
      link: "https://github.com/isabel-moreno22/edu-network",
      techIcons: {
        "React": "⚛️",
        "GraphQL": "◈",
        "Node.js": "🟢",
        "AWS": "☁️"
      }
    },
    {
      id: 5,
      title: "Dashboard analítico",
      verse: "Datos que bailan en visualizaciones poéticas",
      problem: "Métricas sin alma ni contexto",
      solution: "Historias contadas con números",
      tools: ["Angular", "D3.js", "Python", "Tableau"],
      learning: "Los datos cobran vida cuando cuentan historias",
      gradient: "from-[#B4A7D6] to-[#E4C7D6]",
      icon: "📊",
      color: "#6667AB",
      link: "https://github.com/isabel-moreno22/data-stories",
      techIcons: {
        "Angular": "🅰️",
        "D3.js": "📈",
        "Python": "🐍",
        "Tableau": "📉"
      }
    },
    {
      id: 6,
      title: "App de meditación",
      verse: "Paz digital en un mundo acelerado",
      problem: "Estrés constante, sin refugio",
      solution: "Oasis de calma en tu bolsillo",
      tools: ["React Native", "Firebase", "TensorFlow", "Spotify API"],
      learning: "La tecnología puede ser un camino hacia la paz interior",
      gradient: "from-[#D9D7EC] to-[#B4A7D6]",
      icon: "🧘‍♀️",
      color: "#322F68",
      link: "https://github.com/isabel-moreno22/mindful-app",
      techIcons: {
        "React Native": "📱",
        "Firebase": "🔥",
        "TensorFlow": "🧠",
        "Spotify API": "🎵"
      }
    },
    {
      id: 7,
      title: "Portfolio inmersivo",
      verse: "Historias profesionales en 3D",
      problem: "CVs planos, sin personalidad",
      solution: "Experiencias interactivas memorables",
      tools: ["Three.js", "React", "Blender", "GSAP"],
      learning: "Tu historia merece ser contada con magia",
      gradient: "from-[#E4C7D6] to-[#B4A7D6]",
      icon: "🎨",
      color: "#6667AB",
      link: "https://github.com/isabel-moreno22/3d-portfolio",
      techIcons: {
        "Three.js": "🎲",
        "React": "⚛️",
        "Blender": "🎯",
        "GSAP": "✨"
      }
    },
    {
      id: 8,
      title: "AI Content Studio",
      verse: "Creatividad amplificada por inteligencia",
      problem: "Bloqueo creativo, ideas repetitivas",
      solution: "Co-creación con IA empática",
      tools: ["Python", "OpenAI", "Svelte", "Supabase"],
      learning: "La IA es más poderosa cuando colabora, no cuando reemplaza",
      gradient: "from-[#B4A7D6] to-[#D9D7EC]",
      icon: "🤖",
      color: "#322F68",
      link: "https://github.com/isabel-moreno22/ai-studio",
      techIcons: {
        "Python": "🐍",
        "OpenAI": "🧠",
        "Svelte": "🔥",
        "Supabase": "⚡"
      }
    },
    {
      id: 9,
      title: "Crypto Wallet UX",
      verse: "Finanzas descentralizadas humanizadas",
      problem: "Blockchain intimidante y complejo",
      solution: "Interfaz amigable para todos",
      tools: ["Web3.js", "React", "Solidity", "MetaMask"],
      learning: "La complejidad técnica debe ser invisible para el usuario",
      gradient: "from-[#D9D7EC] to-[#E4C7D6]",
      icon: "💎",
      color: "#6667AB",
      link: "https://github.com/isabel-moreno22/friendly-wallet",
      techIcons: {
        "Web3.js": "🌐",
        "React": "⚛️",
        "Solidity": "⟠",
        "MetaMask": "🦊"
      }
    }
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" className="relative py-20 px-6 overflow-hidden">
      {/* Film strip decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#322F68] to-[#6667AB] opacity-10">
        <div className="h-full flex items-center justify-between px-8">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-12 h-10 bg-[#322F68] opacity-20 rounded-sm" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 mt-8"
        >
          <motion.p 
            className="font-script text-3xl text-[#6667AB] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Young and Beautiful
          </motion.p>
          <h2 className="font-serif-display text-5xl md:text-6xl text-[#322F68] mb-4">
            Mis composiciones digitales
          </h2>
          <p className="text-lg text-[#322F68]/80 max-w-2xl mx-auto">
            Cada proyecto es una melodía única donde el código y el diseño danzan juntos
          </p>
          <div className="w-24 h-0.5 bg-[#B4A7D6] mx-auto mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <motion.div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project.id)}
                >
                  {/* Album number badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="font-serif-display text-lg text-[#322F68]">
                      {String(project.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Vinyl record decoration */}
                  <motion.div 
                    className="absolute -right-16 -top-16 w-48 h-48 opacity-10"
                    animate={{
                      rotate: hoveredProject === project.id ? 360 : 0
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: hoveredProject === project.id ? Infinity : 0
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#322F68]">
                      <div className="absolute inset-4 rounded-full bg-[#6667AB]">
                        <div className="absolute inset-4 rounded-full bg-[#322F68]">
                          <div className="absolute inset-6 rounded-full bg-[#D9D7EC]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      className="text-4xl mb-4"
                      animate={{ 
                        scale: hoveredProject === project.id ? [1, 1.2, 1] : 1 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.icon}
                    </motion.div>

                    <h3 className="font-serif-display text-2xl text-[#322F68] mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="font-script text-lg text-[#6667AB] mb-6 italic">
                      "{project.verse}"
                    </p>

                    {/* Track sections */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-1">
                          Track 01: El problema
                        </p>
                        <p className="text-[#322F68]/80">{project.problem}</p>
                      </div>

                      <div>
                        <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-1">
                          Track 02: La solución
                        </p>
                        <p className="text-[#322F68]/80">{project.solution}</p>
                      </div>

                      <div>
                        <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-2">
                          Feat. Tecnologías
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {project.tools.map((tool) => (
                            <div key={tool} className="flex items-center gap-2">
                              <span className="text-xl">{project.techIcons[tool]}</span>
                              <span className="text-sm text-[#322F68]/70">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#322F68]/10">
                        <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-1">
                          Outro: Aprendizaje
                        </p>
                        <p className="text-sm text-[#322F68]/80 italic">
                          "{project.learning}"
                        </p>
                      </div>
                    </div>

                    {/* Play button */}
                    <motion.button
                      className="absolute bottom-4 right-4 w-10 h-10 bg-[#6667AB] text-white rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                        y: hoveredProject === project.id ? 0 : 10
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ▶
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={prevPage}
            className="w-12 h-12 rounded-full bg-[#D9D7EC] hover:bg-[#B4A7D6] transition-colors flex items-center justify-center text-[#322F68]"
            aria-label="Página anterior"
          >
            ←
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-[#6667AB]'
                    : 'bg-[#D9D7EC] hover:bg-[#B4A7D6]'
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            className="w-12 h-12 rounded-full bg-[#D9D7EC] hover:bg-[#B4A7D6] transition-colors flex items-center justify-center text-[#322F68]"
            aria-label="Página siguiente"
          >
            →
          </button>
        </motion.div>
      </div>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] max-w-4xl mx-auto bg-gradient-to-br from-[#F6F4F9] to-[#D9D7EC] rounded-3xl shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center hover:bg-white/70 transition-colors"
                >
                  ✕
                </button>
                
                {(() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  return (
                    <div>
                      {/* Album Cover Header */}
                      <div className="flex items-start gap-6 mb-8">
                        <div className="relative">
                          {/* Vinyl Record Visual */}
                          <motion.div 
                            className="w-32 h-32 relative"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                          >
                            <div className="w-full h-full rounded-full bg-[#322F68] shadow-xl">
                              <div className="absolute inset-4 rounded-full bg-[#6667AB]">
                                <div className="absolute inset-4 rounded-full bg-[#322F68]">
                                  <div className="absolute inset-6 rounded-full bg-[#D9D7EC] flex items-center justify-center">
                                    <span className="text-3xl">{project.icon}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-[#6667AB] uppercase tracking-wider">
                              Album {String(project.id).padStart(2, '0')}
                            </span>
                            <div className="flex-1 h-px bg-[#B4A7D6]/30" />
                          </div>
                          <h3 className="font-serif-display text-4xl text-[#322F68] mb-3">
                            {project.title}
                          </h3>
                          <p className="font-script text-2xl text-[#6667AB] italic">
                            "{project.verse}"
                          </p>
                        </div>
                      </div>

                      {/* Track Listing */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Side A */}
                        <div>
                          <h4 className="font-serif-display text-xl text-[#322F68] mb-4 flex items-center gap-2">
                            <span className="text-2xl">💿</span> Lado A: El Desafío
                          </h4>
                          <div className="space-y-4">
                            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
                              <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-2">
                                Track 01: El problema
                              </p>
                              <p className="text-[#322F68]">{project.problem}</p>
                            </div>
                            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
                              <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-2">
                                Track 02: La solución
                              </p>
                              <p className="text-[#322F68]">{project.solution}</p>
                            </div>
                          </div>
                        </div>

                        {/* Side B */}
                        <div>
                          <h4 className="font-serif-display text-xl text-[#322F68] mb-4 flex items-center gap-2">
                            <span className="text-2xl">🎵</span> Lado B: La Técnica
                          </h4>
                          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4">
                            <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-3">
                              Feat. Tecnologías
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {project.tools.map((tool) => (
                                <motion.div 
                                  key={tool} 
                                  className="flex items-center gap-2 bg-white/50 rounded-lg p-2"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  <span className="text-2xl">{project.techIcons[tool]}</span>
                                  <span className="text-sm text-[#322F68] font-medium">{tool}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Outro Section */}
                      <div className="bg-gradient-to-r from-[#E4C7D6]/20 to-[#B4A7D6]/20 rounded-lg p-6 mb-8">
                        <p className="text-xs text-[#322F68]/60 uppercase tracking-wider mb-2 text-center">
                          🎼 Outro: Aprendizaje
                        </p>
                        <p className="text-lg text-[#322F68] italic text-center font-script">
                          "{project.learning}"
                        </p>
                      </div>

                      {/* Album Credits / Actions */}
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-[#B4A7D6]/30">
                        <div className="text-sm text-[#322F68]/60">
                          <p>Producido por: Isabel Moreno</p>
                          <p>Estudio: Code & Poetry Records</p>
                        </div>
                        
                        <div className="flex gap-3">
                          <motion.a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#6667AB] text-white px-6 py-3 rounded-full hover:bg-[#322F68] transition-colors shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>Escuchar en GitHub</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                          
                          <motion.button
                            onClick={() => setSelectedProject(null)}
                            className="px-6 py-3 border-2 border-[#6667AB] text-[#6667AB] rounded-full hover:bg-[#6667AB] hover:text-white transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Cerrar
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;