import React from 'react';
import { motion } from 'framer-motion';
import { type Project } from './Projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-gray-300 text-sm line-clamp-3 mb-4">{project.description}</p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              View Project
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
          {project.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="px-3 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-full border border-gray-700/50 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-colors"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">+{project.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;