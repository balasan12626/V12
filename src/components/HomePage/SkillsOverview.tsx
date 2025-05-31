import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Code, Database, Cloud } from 'lucide-react';

const SkillsOverview: React.FC = () => {
  const skillCategories = [
    {
      icon: <Code size={40} className="text-blue-400" />,
      title: 'Frontend Development',
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular']
    },
    {
      icon: <Database size={40} className="text-green-400" />,
      title: 'Backend Development',
      skills: ['Node.js', 'Python', 'Java', 'Express', 'Django', 'FastAPI']
    },
    {
      icon: <Brain size={40} className="text-purple-400" />,
      title: 'AI & Machine Learning',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Computer Vision', 'NLP']
    },
    {
      icon: <Cloud size={40} className="text-yellow-400" />,
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD']
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">My Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            An overview of my technical abilities and expertise across various technologies and domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
              
              <ul className="space-y-2 mb-6">
                {category.skills.map((skill, i) => (
                  <li key={i} className="text-gray-400 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/skills"
            className="px-6 py-3 border border-purple-500 text-white font-medium rounded-lg hover:bg-purple-500/10 transition-all duration-300"
          >
            See All Skills
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SkillsOverview;