import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram } from 'lucide-react';

const ProfileSection: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-purple-500">
            <img 
              src="/Profile.jpg" 
              alt="Balakarthikeyan - Data Analyst & AI Developer" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-4">Hello, I'm Bala</h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            I'm a passionate fresher specializing in Artificial Intelligence, Machine Learning, and Generative AI. 
            I'm currently working on innovative AI algorithms and cutting-edge projects, and I actively freelance as a Power BI and data analyst.
          </p>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            I enjoy building intelligent and interactive applications using modern web technologies. 
            My focus is on creative solutions that combine automation with human-like reasoning and decision-making.
          </p>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            I'm deeply committed to continuous learning and leveraging emerging technologies to build useful 
            tools to tackle real-world challenges. I aim to grow into a versatile developer and data professional 
            by exploring cutting-edge technologies and contributing to impactful projects.
          </p>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/balasan12626" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/balakarthikeyan02122005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://www.instagram.com/bala_karthi_2?igsh=MWN2aXJqcDl1ZXl3ZQ==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;