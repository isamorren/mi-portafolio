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
      gradient: "from-[#F6F4F9] via-[#D9D7EC] to-[#F6F4F9]",
      icon: "🌱",
      color: "#6667AB",
      link: "https://github.com/isamorren/eco-marketplace",
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
      gradient: "from-[#D9D7EC] via-[#B4A7D6] to-[#D9D7EC]",
      icon: "✨",
      color: "#6667AB",
      link: "https://github.com/isamorren/talent-hub",
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
      verse: "El tiempo convertido en experiencias memorables",
      problem: "Agendas caóticas, clientes frustrados",
      solution: "Calendario inteligente con notificaciones",
      tools: ["Vue.js", "Express", "MySQL", "Twilio"],
      learning: "La organización es un regalo de respeto",
      gradient: "from-[#F6F4F9] via-[#E4C7D6] to-[#F6F4F9]",
      icon: "📅",
      color: "#E4C7D6",
      link: "https://github.com/isamorren/smart-booking",
      techIcons: {
        "Vue.js": "💚",
        "Express": "🚂",
        "MySQL": "🐬",
        "Twilio": "📱"
      }
    },
    {
      id: 4,
      title: "Red social educativa",
      verse: "Donde el conocimiento fluye como conversación",
      problem: "Aprendizaje aislado y desmotivador",
      solution: "Comunidad que celebra cada progreso",
      tools: ["React Native", "Django", "Redis", "AWS"],
      learning: "Aprender juntos multiplica la sabiduría",
      gradient: "from-[#F6F4F9] via-[#D9D7EC] to-[#F6F4F9]",
      icon: "📚",
      color: "#6667AB",
      link: "https://github.com/isamorren/edu-connect",
      techIcons: {
        "React Native": "📱",
        "Django": "🐍",
        "Redis": "⚡",
        "AWS": "☁️"
      }
    },
    {
      id: 5,
      title: "Dashboard analítico",
      verse: "Datos que cuentan historias, no solo números",
      problem: "Métricas sin contexto ni propósito",
      solution: "Visualizaciones que inspiran decisiones",
      tools: ["D3.js", "Python", "Tableau", "BigQuery"],
      learning: "Los números cobran vida con el diseño correcto",
      gradient: "from-[#D9D7EC] via-[#B4A7D6] to-[#D9D7EC]",
      icon: "📊",
      color: "#6667AB",
      link: "https://github.com/isamorren/data-stories",
      techIcons: {
        "D3.js": "📈",
        "Python": "🐍",
        "Tableau": "📊",
        "BigQuery": "🔍"
      }
    },
    {
      id: 6,
      title: "App de meditación",
      verse: "Tecnología que susurra calma en el caos digital",
      problem: "Ansiedad en la era de notificaciones",
      solution: "Oasis de paz en tu bolsillo",
      tools: ["Flutter", "Firebase", "TensorFlow", "Audio API"],
      learning: "El silencio también puede programarse",
      gradient: "from-[#F6F4F9] via-[#D9D7EC] to-[#F6F4F9]",
      icon: "🧘",
      color: "#6667AB",
      link: "https://github.com/isamorren/mindful-app",
      techIcons: {
        "Flutter": "🦋",
        "Firebase": "🔥",
        "TensorFlow": "🧠",
        "Audio API": "🎵"
      }
    },
    {
      id: 7,
      title: "Portfolio inmersivo",
      verse: "Donde el código se viste de gala para brillar",
      problem: "CVs aburridos, talentos invisibles",
      solution: "Experiencia 3D que cautiva recruiters",
      tools: ["Three.js", "WebGL", "GSAP", "Blender"],
      learning: "La primera impresión puede ser tridimensional",
      gradient: "from-[#D9D7EC] via-[#E4C7D6] to-[#D9D7EC]",
      icon: "🎨",
      color: "#E4C7D6",
      link: "https://github.com/isamorren/3d-portfolio",
      techIcons: {
        "Three.js": "🎲",
        "WebGL": "🌐",
        "GSAP": "✨",
        "Blender": "🎨"
      }
    },
    {
      id: 8,
      title: "AI Content Studio",
      verse: "Inteligencia artificial con corazón creativo",
      problem: "Creación de contenido lenta y repetitiva",
      solution: "Asistente que potencia, no reemplaza",
      tools: ["OpenAI", "Langchain", "Pinecone", "FastAPI"],
      learning: "La IA es mejor cuando colabora, no cuando suplanta",
      gradient: "from-[#F6F4F9] via-[#B4A7D6] to-[#F6F4F9]",
      icon: "🤖",
      color: "#6667AB",
      link: "https://github.com/isamorren/ai-studio",
      techIcons: {
        "OpenAI": "🧠",
        "Langchain": "🔗",
        "Pinecone": "🌲",
        "FastAPI": "⚡"
      }
    },
    {
      id: 9,
      title: "Crypto Wallet UX",
      verse: "Finanzas descentralizadas para humanos normales",
      problem: "Web3 intimidante para principiantes",
      solution: "Interfaz que traduce complejidad en simplicidad",
      tools: ["Web3.js", "Ethers", "MetaMask", "Hardhat"],
      learning: "La adopción masiva necesita diseño empático",
      gradient: "from-[#D9D7EC] via-[#B4A7D6] to-[#D9D7EC]",
      icon: "💎",
      color: "#6667AB",
      link: "https://github.com/isamorren/simple-wallet",
      techIcons: {
        "Web3.js": "🌐",
        "Ethers": "⚡",
        "MetaMask": "🦊",
        "Hardhat": "⛑️"
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

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Main Card */}
      <div
        className={`relative bg-gradient-to-br ${project.gradient} rounded-3xl p-8 shadow-lg border border-[#F6F4F9]/60 overflow-hidden backdrop-blur-sm hover:shadow-xl transition-all duration-500 ease-out group-hover:scale-[1.01] group-hover:-translate-y-1`}
        style={{
          boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 4px 8px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* Album cover header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="text-5xl mb-4 inline-block group-hover:scale-105 transition-transform duration-300">
              {project.icon}
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1A1A2F] mb-2">
              {project.title}
            </h3>
            <p className="font-script text-lg text-[#322F68] italic leading-relaxed">
&ldquo;{project.verse}&rdquo;
            </p>
          </div>
          
          {/* Animated vinyl record */}
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1A1A2F] to-[#322F68] relative flex-shrink-0 ml-4 group-hover:rotate-45 transition-transform duration-700 ease-out"
            style={{
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.1)"
            }}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#322F68] to-[#1A1A2F]" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#322F68] to-[#1A1A2F]" />
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#E4C7D6] to-[#B4A7D6]" />
            <div className="absolute inset-[30px] rounded-full bg-white/10" />
          </div>
        </div>

        {/* Track listing content */}
        <div className="space-y-4 mb-8">
          <div className="border-l-3 border-[#B4A7D6]/50 pl-4 hover:border-[#6667AB] hover:translate-x-1 transition-all duration-300">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#322F68] mb-1">Track 01: El problema</p>
            <p className="text-[#322F68] leading-relaxed">{project.problem}</p>
          </div>
          
          <div className="border-l-3 border-[#B4A7D6]/50 pl-4 hover:border-[#6667AB] hover:translate-x-1 transition-all duration-300">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#322F68] mb-1">Track 02: La solución</p>
            <p className="text-[#322F68] leading-relaxed">{project.solution}</p>
          </div>
          
          <div className="border-l-3 border-[#B4A7D6]/50 pl-4 hover:border-[#6667AB] hover:translate-x-1 transition-all duration-300">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">Feat. Tecnologías</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 bg-[#F6F4F9]/70 backdrop-blur-sm rounded-full text-xs font-medium text-[#322F68] border border-[#B4A7D6]/30 hover:bg-[#F6F4F9] hover:border-[#6667AB] hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-1"
                >
                  <span className="text-sm">{project.techIcons[tool]}</span>
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border-l-3 border-[#B4A7D6]/50 pl-4 hover:border-[#6667AB] hover:translate-x-1 transition-all duration-300">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#322F68] mb-1">Outro: Aprendizaje</p>
            <p className="text-[#322F68] italic leading-relaxed">&ldquo;{project.learning}&rdquo;</p>
          </div>
        </div>

        {/* CTA Button with modal trigger */}
        <button
          onClick={() => setSelectedProject(project.id)}
          className="w-full py-4 rounded-2xl font-semibold text-white relative overflow-hidden group/btn shadow-lg hover:shadow-xl hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300"
          style={{ 
            backgroundColor: project.color,
            boxShadow: `0 4px 15px ${project.color}30`
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          
          {/* Button content */}
          <span className="relative flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Ver más detalles
          </span>
        </button>

        {/* Decorative elements */}
        <div 
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-3 border-[#F6F4F9]/70 flex items-center justify-center"
          style={{ backgroundColor: project.color + "20" }}
        >
          <span className="text-xs font-bold" style={{ color: project.color }}>
            {String(index + 1 + currentPage * projectsPerPage).padStart(2, '0')}
          </span>
        </div>
        
        {/* Film perforations */}
        <div className="absolute top-0 left-0 w-full h-2 flex justify-around opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-3 h-2 bg-[#1A1A2F] rounded-sm" />
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Modal component
  const ProjectModal = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return null;

    return (
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-[#1A1A2F]/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal content */}
            <motion.div
              className="relative bg-[#F6F4F9] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header with gradient */}
              <div className={`bg-gradient-to-br ${project.gradient} p-8 rounded-t-3xl`}>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F6F4F9]/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#F6F4F9]/30 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                
                <div className="text-center">
                  <motion.div 
                    className="text-6xl mb-4 inline-block"
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 1 }}
                  >
                    {project.icon}
                  </motion.div>
                  <h3 className="font-serif-display text-3xl font-bold text-[#1A1A2F] mb-2">
                    {project.title}
                  </h3>
                  <p className="font-script text-xl text-[#322F68] italic">
      &ldquo;{project.verse}&rdquo;
                  </p>
                </div>
              </div>
              
              {/* Modal body */}
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-[#1A1A2F] mb-2">El desafío</h4>
                  <p className="text-[#322F68] leading-relaxed">{project.problem}</p>
                </div>
                
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-[#1A1A2F] mb-2">La solución creativa</h4>
                  <p className="text-[#322F68] leading-relaxed">{project.solution}</p>
                </div>
                
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-[#1A1A2F] mb-3">Stack tecnológico</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.tools.map((tool) => (
                      <div
                        key={tool}
                        className="flex items-center gap-2 px-4 py-2 bg-[#D9D7EC]/30 rounded-xl border border-[#B4A7D6]/30"
                      >
                        <span className="text-lg">{project.techIcons[tool]}</span>
                        <span className="font-medium text-[#322F68]">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#D9D7EC]/30 rounded-2xl p-6">
                  <h4 className="font-serif-display text-lg font-bold text-[#1A1A2F] mb-2">Reflexión final</h4>
                  <p className="text-[#322F68] italic leading-relaxed">&ldquo;{project.learning}&rdquo;</p>
                </div>
                
                {/* Action button */}
                <div className="pt-4">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl font-semibold text-white text-center relative overflow-hidden group block"
                    style={{ backgroundColor: project.color }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative">Ver en GitHub →</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <section id="projects" className="py-32 px-6 relative overflow-hidden bg-[#F6F4F9]">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23322F68' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-script text-3xl text-[#6667AB] mb-4">"Young and Beautiful"</p>
            <h2 className="font-serif-display text-5xl md:text-7xl text-[#1A1A2F] mb-4">
              Mis <span className="font-script italic text-[#6667AB]">composiciones</span> digitales
            </h2>
            <p className="text-xl text-[#322F68] max-w-2xl mx-auto">
              Cada proyecto es una melodía única donde el código y el diseño danzan juntos
            </p>
            <motion.div 
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#6667AB] to-transparent mx-auto mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Project cards with slide animation */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                {currentProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-8 mt-12">
                <motion.button
                  onClick={prevPage}
                  className="p-3 rounded-full bg-[#F6F4F9] shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 19l-7-7 7-7" stroke="#6667AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>

                {/* Page indicators */}
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentPage ? 'w-8 bg-[#6667AB]' : 'bg-[#B4A7D6]/50'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextPage}
                  className="p-3 rounded-full bg-[#F6F4F9] shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="#6667AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            )}
          </div>

          {/* Film projector decoration */}
          <motion.div
            className="absolute -bottom-20 -right-20 opacity-5"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#6667AB" strokeWidth="2"/>
              <circle cx="150" cy="50" r="40" stroke="#6667AB" strokeWidth="2"/>
              <rect x="30" y="90" width="140" height="80" stroke="#6667AB" strokeWidth="2" rx="10"/>
              <circle cx="50" cy="50" r="10" fill="#6667AB"/>
              <circle cx="150" cy="50" r="10" fill="#6667AB"/>
            </svg>
          </motion.div>
        </div>
      </section>
      
      {/* Modal */}
      <ProjectModal />
    </>
  );
};

export default Projects;