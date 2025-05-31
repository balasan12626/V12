import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const FeaturedProjects: React.FC = () => {
  const featuredProjects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Website',
      description: 'A modern e-commerce platform built with React, Node.js, and MongoDB',
      image: 'https://images.pexels.com/photos/38519/macbook-laptop-ipad-apple-38519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tags: ['React', 'Node.js', 'MongoDB', 'Redux']
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'Interactive weather application with beautiful visualizations and forecasts',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tags: ['React', 'API', 'Chart.js']
    },
    {
      id: 3,
      title: '3D Portfolio',
      description: 'Modern portfolio website showcasing 3D modeling work with interactive elements',
      image: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tags: ['Three.js', 'React', 'GSAP', 'WebGL']
    },
  ];

  return (
    <section className="py-16 bg-black/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work showcasing applications, animations, and interactive experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-900/60 backdrop-blur-sm rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/projects`} 
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Project <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/projects"
            className="px-6 py-3 border border-purple-500 text-white font-medium rounded-lg hover:bg-purple-500/10 transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;