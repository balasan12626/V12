import React from 'react';
import ProfileSection from './ProfileSection';
import Education from './Education';
import Experience from './Experience';
import ApiTest from '../ApiTest';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
      </div>
      
      <ProfileSection />
      <Education />
      <Experience />
      <ApiTest className="mt-12" />
    </div>
  );
};

export default About;