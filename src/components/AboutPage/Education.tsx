import React from 'react';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  const educationData = [
    {
      degree: 'B.Tech in Artificial Intelligence & Data Science',
      institution: 'Sona College',
      period: '2024-2027'
    },
    {
      degree: 'Diploma in Electronics and Communication Engineering',
      institution: 'Thiagarajar Polytechnic College',
      period: '2021-2024'
    }
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center mb-8">
        <GraduationCap size={28} className="text-purple-500 mr-3" />
        <h2 className="text-2xl font-bold text-white">Education</h2>
      </div>
      
      <div className="space-y-6">
        {educationData.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-purple-500"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{item.degree}</h3>
            <p className="text-gray-400 mb-2">{item.institution}</p>
            <p className="text-sm text-purple-400">{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
