import React from 'react';
import SkillCategory from './SkillCategory';
import { Code, Database, Brain, Cloud, Layers } from 'lucide-react';

interface SkillType {
  name: string;
  percentage: number;
  color: string;
}

interface CategoryType {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: SkillType[];
}

const Skills: React.FC = () => {
  const skillCategories: CategoryType[] = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Code size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'HTML', percentage: 90, color: '#00C4FF' },
        { name: 'CSS', percentage: 85, color: '#00C4FF' },
        { name: 'JavaScript', percentage: 85, color: '#00C4FF' },
        { name: 'TypeScript', percentage: 80, color: '#00C4FF' },
        { name: 'React', percentage: 85, color: '#00C4FF' },
        { name: 'Angular', percentage: 70, color: '#00C4FF' }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: <Layers size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Python', percentage: 85, color: '#00C4FF' },
        { name: 'Node.js', percentage: 80, color: '#00C4FF' },
        { name: 'Express.js', percentage: 75, color: '#00C4FF' },
        { name: 'FastAPI', percentage: 70, color: '#00C4FF' }
      ]
    },
    {
      id: 'database',
      title: 'Database Skills',
      icon: <Database size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'MongoDB', percentage: 85, color: '#00C4FF' },
        { name: 'MySQL', percentage: 80, color: '#00C4FF' },
        { name: 'PostgreSQL', percentage: 75, color: '#00C4FF' },
        { name: 'SQLite', percentage: 80, color: '#00C4FF' }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: <Brain size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Machine Learning', percentage: 85, color: '#00C4FF' },
        { name: 'Deep Learning', percentage: 75, color: '#00C4FF' },
        { name: 'NLP', percentage: 75, color: '#00C4FF' },
        { name: 'Computer Vision', percentage: 70, color: '#00C4FF' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="section-title text-4xl font-bold mb-4">My Skills</h1>
        <p className="text-[#B0C4DE] max-w-2xl mx-auto">
          An overview of my technical abilities and expertise across various technologies and domains
        </p>
      </div>
      
      <div className="space-y-8">
        {skillCategories.map((category) => (
          <SkillCategory 
            key={category.id}
            title={category.title}
            icon={category.icon}
            skills={category.skills}
          />
        ))}
      </div>
    </div>
  );
};

export default Skills