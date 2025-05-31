import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
      
      <div className="space-y-6 mb-12">
        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-purple-500/20 p-3 rounded-full">
            <Mail size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Email</h3>
            <p className="text-gray-400">sbb202122005@gmail.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-purple-500/20 p-3 rounded-full">
            <Phone size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
            <p className="text-gray-400">8778725356</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-4 bg-purple-500/20 p-3 rounded-full">
            <MapPin size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Location</h3>
            <p className="text-gray-400">Salem, Tamil Nadu, India</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
        <div className="flex space-x-4">
          <a 
            href="https://github.com/balasan12626" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/balakarthikeyan02122005" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#0A66C2] hover:bg-[#0A66C2]/80 text-white p-3 rounded-full transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://www.instagram.com/bala_karthi_2?igsh=MWN2aXJqcDl1ZXl3ZQ==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#E4405F] hover:bg-[#E4405F]/80 text-white p-3 rounded-full transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-bold text-white mb-6">Let's Work Together</h3>
        <p className="text-gray-300 mb-4">
          I'm currently available for freelance work and exciting projects. If you have an idea or want to 
          discuss potential collaboration, feel free to reach out!
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;