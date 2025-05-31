import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/60 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-white">
              Balakarthikeyan
            </Link>
            <p className="text-gray-400 mt-2 text-sm">
              AI & Machine Learning Engineer
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/balasan12626" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/balakarthikeyan02122005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://www.instagram.com/bala_karthi_2?igsh=MWN2aXJqcDl1ZXl3ZQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            {currentYear} Balakarthikeyan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;