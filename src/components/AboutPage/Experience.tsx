import React from 'react';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const experienceData = [
    {
      position: 'Freelance Data Analyst',
      company: 'Power BI, Data Analysis',
      period: '2025 - Present',
      description: 'Working with clients to create interactive dashboards and reports. Performing data cleaning, transformation, and visualization to derive actionable insights.'
    },
    {
      position: 'AI Agent Projects',
      company: 'AI Development, Machine Learning',
      period: '2024 - Present',
      description: 'Developing intelligent agents using machine learning algorithms. Building and training models for various applications including computer vision and natural language processing.'
    }
  ];

  return (
    <section>
      <div className="flex items-center mb-8">
        <Briefcase size={28} className="text-purple-500 mr-3" />
        <h2 className="text-2xl font-bold text-white">Experience</h2>
      </div>
      
      <div className="space-y-6">
        {experienceData.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{item.position}</h3>
            <p className="text-gray-400 mb-2">{item.company}</p>
            <p className="text-sm text-blue-400 mb-4">{item.period}</p>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
