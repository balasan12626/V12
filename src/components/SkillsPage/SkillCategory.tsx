import React from 'react';
import SkillBar from './SkillBar';

interface SkillType {
  name: string;
  percentage: number;
  color: string;
}

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: SkillType[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, icon, skills }) => {
  return (
    <section className="card-gradient rounded-xl p-8">
      <div className="flex items-center mb-8">
        <div className="mr-3">{icon}</div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <SkillBar 
            key={index}
            name={skill.name}
            percentage={skill.percentage}
            color={skill.color}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillCategory