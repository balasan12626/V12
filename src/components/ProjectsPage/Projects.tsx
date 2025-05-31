import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { ArrowRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'IMSGR - AI Chat & Messaging Platform',
    description: 'An AI-powered messaging platform with smart replies, language understanding, and automated assistance. Features include real-time chat, file sharing, and AI-driven conversation analysis for enhanced communication.',
    image: 'https://media.istockphoto.com/id/2184839243/photo/ai-llm-chatbot-software-ui-showing-virtual-assistant-answering-user-prompts.jpg?s=2048x2048&w=is&k=20&c=5k-J-wkUDD6xB0g-i3ifxeL6nYPkuQCFTdJGcTeOkJo=',
    tags: ['React', 'Node.js', 'WebSocket', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
    category: ['web', 'real-time', 'communication'],
    github: 'https://github.com/balasan12626/imsgr-app',
    demo: 'https://imsgr-demo.com'
  },
  {
    id: 2,
    title: 'AI-Powered Note Taking Application',
    description: 'An intelligent note-taking application with AI-powered organization, search, and summarization features. Built with React and integrated with AI agents for smart note management.',
    image: 'https://media.istockphoto.com/id/1307162575/photo/wireless-wifi-for-remote-work-in-airport-lounge-bar-hotel-lobby-or-cafe-phone-and-laptop.jpg?s=2048x2048&w=is&k=20&c=Badj7n6LMKoZvaYHLvAOIvsZnzi1Q5FM5jZ1vhvFMUU=',
    tags: ['React', 'AI Integration', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    category: ['web', 'ai', 'productivity'],
    github: 'https://github.com/balasan12626/ai-note-taking-app',
    demo: 'https://ainotes-demo.com'
  },
  {
    id: 3,
    title: 'E-commerce Platform with AI Chatbot',
    description: 'A full-featured e-commerce website with an AI-powered chatbot for customer support. Features include product recommendations, secure payments, and order tracking.',
    image: 'https://images.unsplash.com/photo-1642052503083-9b9f61e75710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'AI Chatbot', 'Stripe'],
    category: ['web', 'ecommerce', 'ai'],
    github: 'https://github.com/balasan12626/ecommerce-ai-chatbot',
    demo: 'https://ecom-chatbot-demo.com'
  },
  {
    id: 4,
    title: 'Tamil Nadu Heritage Explorer',
    description: 'A platform for exploring Tamil Nadu\'s rich heritage with virtual tours and historical insights. Features include remote accessibility, user reviews, and educational resources about historical sites.',
    image: 'https://media.istockphoto.com/id/1307162575/photo/wireless-wifi-for-remote-work-in-airport-lounge-bar-hotel-lobby-or-cafe-phone-and-laptop.jpg?s=2048x2048&w=is&k=20&c=Badj7n6LMKoZvaYHLvAOIvsZnzi1Q5FM5jZ1vhvFMUU=',
    tags: ['React', 'Firebase', 'Node.js', 'Google Maps API', 'Tailwind CSS'],
    category: ['web', 'travel', 'education'],
    github: 'https://github.com/balasan12626/tamilnadu-heritage',
    demo: 'https://tamilnadu-heritage-explorer.web.app'
  }
];

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore a collection of my latest work, where creativity meets functionality
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Want to see more?</h3>
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-all group"
          >
            Get in Touch 
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
