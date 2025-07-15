import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    verse: string;
    problem: string;
    solution: string;
    tools: string[];
    learning: string;
    gradient: string;
    icon: string;
    color: string;
    link?: string;
    techIcons: Record<string, string>;
  };
  index: number;
  onHover: (id: number | null) => void;
  onSelect: (id: number) => void;
  isHovered: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  index, 
  onHover, 
  onSelect,
  isHovered 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-8 cursor-pointer transform transition-all duration-300`}
        whileHover={{ scale: 1.02, rotateY: 5 }}
        onMouseEnter={() => onHover(project.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect(project.id)}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Decorative number */}
        <div className="absolute top-4 right-4 text-6xl font-serif-display text-[#322F68]/10">
          {String(project.id).padStart(2, '0')}
        </div>

        {/* Icon */}
        <motion.div 
          className="text-4xl mb-4"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {project.icon}
        </motion.div>

        {/* Title */}
        <h3 className="font-serif-display text-2xl text-[#322F68] mb-2">{project.title}</h3>
        
        {/* Verse */}
        <p className="font-script text-lg text-[#6667AB] mb-4 italic">{project.verse}</p>

        {/* Problem & Solution */}
        <div className="space-y-3 mb-4">
          <div>
            <span className="text-xs text-[#322F68]/60 uppercase tracking-wider">Desafío</span>
            <p className="text-[#322F68]/80">{project.problem}</p>
          </div>
          <div>
            <span className="text-xs text-[#322F68]/60 uppercase tracking-wider">Solución</span>
            <p className="text-[#322F68]/80">{project.solution}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.map((tool) => (
            <span 
              key={tool}
              className="text-xl"
              title={tool}
            >
              {project.techIcons[tool]}
            </span>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="absolute bottom-4 right-4 text-sm text-[#6667AB] opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Ver más →
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;