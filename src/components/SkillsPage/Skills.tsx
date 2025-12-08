import React from 'react';
import SkillCategory from './SkillCategory';
import { BarChart3, Database, Brain, TrendingUp, Users, Award, Code } from 'lucide-react';

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
      id: 'data-analysis-tools',
      title: 'Data Analysis & BI Tools',
      icon: <BarChart3 size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Microsoft Excel', percentage: 95, color: '#00C4FF' },
        { name: 'Power BI', percentage: 90, color: '#00C4FF' },
        { name: 'Tableau', percentage: 85, color: '#00C4FF' },
        { name: 'Google Sheets', percentage: 90, color: '#00C4FF' },
        { name: 'Looker Studio', percentage: 80, color: '#00C4FF' },
        { name: 'Microsoft Access', percentage: 80, color: '#00C4FF' }
      ]
    },
    {
      id: 'programming-data',
      title: 'Programming & Data Science',
      icon: <Brain size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Python', percentage: 90, color: '#00C4FF' },
        { name: 'SQL', percentage: 95, color: '#00C4FF' },
        { name: 'R', percentage: 75, color: '#00C4FF' },
        { name: 'Pandas', percentage: 85, color: '#00C4FF' },
        { name: 'NumPy', percentage: 85, color: '#00C4FF' },
        { name: 'Matplotlib', percentage: 80, color: '#00C4FF' }
      ]
    },
    {
      id: 'database',
      title: 'Database & ETL',
      icon: <Database size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'MySQL', percentage: 90, color: '#00C4FF' },
        { name: 'PostgreSQL', percentage: 85, color: '#00C4FF' },
        { name: 'Microsoft SQL Server', percentage: 85, color: '#00C4FF' },
        { name: 'MongoDB', percentage: 75, color: '#00C4FF' },
        { name: 'ETL Processes', percentage: 80, color: '#00C4FF' },
        { name: 'Data Warehousing', percentage: 75, color: '#00C4FF' }
      ]
    },
    {
      id: 'statistical-analysis',
      title: 'Statistical Analysis & ML',
      icon: <TrendingUp size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Statistical Analysis', percentage: 85, color: '#00C4FF' },
        { name: 'Hypothesis Testing', percentage: 80, color: '#00C4FF' },
        { name: 'Regression Analysis', percentage: 85, color: '#00C4FF' },
        { name: 'Predictive Modeling', percentage: 75, color: '#00C4FF' },
        { name: 'Machine Learning', percentage: 80, color: '#00C4FF' },
        { name: 'A/B Testing', percentage: 75, color: '#00C4FF' },
        { name: 'Time Series Analysis', percentage: 70, color: '#00C4FF' }
      ]
    },
    {
      id: 'soft-skills',
      title: 'Soft Skills & Business',
      icon: <Users size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Data Storytelling', percentage: 90, color: '#00C4FF' },
        { name: 'Business Communication', percentage: 90, color: '#00C4FF' },
        { name: 'Problem Solving', percentage: 95, color: '#00C4FF' },
        { name: 'Critical Thinking', percentage: 90, color: '#00C4FF' },
        { name: 'Presentation Skills', percentage: 85, color: '#00C4FF' },
        { name: 'Team Collaboration', percentage: 90, color: '#00C4FF' },
        { name: 'Project Management', percentage: 80, color: '#00C4FF' },
        { name: 'Stakeholder Management', percentage: 85, color: '#00C4FF' }
      ]
    },
    {
      id: 'domain-knowledge',
      title: 'Domain Knowledge',
      icon: <Award size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'Business Intelligence', percentage: 90, color: '#00C4FF' },
        { name: 'KPI Development', percentage: 85, color: '#00C4FF' },
        { name: 'Data Quality Management', percentage: 85, color: '#00C4FF' },
        { name: 'Dashboard Design', percentage: 90, color: '#00C4FF' },
        { name: 'Data Cleaning', percentage: 95, color: '#00C4FF' },
        { name: 'Report Automation', percentage: 80, color: '#00C4FF' }
      ]
    },
    {
      id: 'web-development',
      title: 'Web Development (Additional)',
      icon: <Code size={24} className="text-[#00C4FF]" />,
      skills: [
        { name: 'HTML', percentage: 55, color: '#00C4FF' },
        { name: 'CSS', percentage: 55, color: '#00C4FF' },
        { name: 'React', percentage: 50, color: '#00C4FF' },
        { name: 'Bootstrap', percentage: 50, color: '#00C4FF' },
        { name: 'Tailwind CSS', percentage: 50, color: '#00C4FF' },
        { name: 'Node.js', percentage: 50, color: '#00C4FF' },
        { name: 'FastAPI', percentage: 50, color: '#00C4FF' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="section-title text-4xl font-bold mb-4">My Skills</h1>
        <p className="text-[#B0C4DE] max-w-2xl mx-auto">
          Comprehensive expertise in Data Analysis, Business Intelligence, and Analytics. Proficient in industry-leading tools and methodologies for data-driven decision making.
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

export default Skills;
