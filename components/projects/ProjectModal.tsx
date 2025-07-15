import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] max-w-4xl mx-auto bg-gradient-to-br from-[#F6F4F9] to-[#D9D7EC] rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/70 transition-colors"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="p-8 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <span className="text-6xl">{project.icon}</span>
                <div>
                  <h2 className="font-serif-display text-4xl text-[#322F68] mb-2">
                    {project.title}
                  </h2>
                  <p className="font-script text-xl text-[#6667AB] italic">
                    {project.verse}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-xl text-[#322F68] mb-2">
                      El Desafío
                    </h3>
                    <p className="text-[#322F68]/80 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-xl text-[#322F68] mb-2">
                      La Solución
                    </h3>
                    <p className="text-[#322F68]/80 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-xl text-[#322F68] mb-2">
                      Lo que aprendí
                    </h3>
                    <p className="text-[#322F68]/80 leading-relaxed italic">
                      "{project.learning}"
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-xl text-[#322F68] mb-4">
                      Stack Tecnológico
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.tools.map((tool: string) => (
                        <div
                          key={tool}
                          className="flex items-center gap-3 bg-white/50 rounded-lg p-3"
                        >
                          <span className="text-2xl">{project.techIcons[tool]}</span>
                          <span className="text-[#322F68]">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {project.link && (
                    <div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#6667AB] text-white px-6 py-3 rounded-full hover:bg-[#322F68] transition-colors"
                      >
                        Ver en GitHub
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;