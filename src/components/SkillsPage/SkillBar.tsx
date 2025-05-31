import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, color }) => {
  const [width, setWidth] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setWidth(percentage);
    }
  }, [inView, percentage]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs font-medium text-[#00C4FF]">{percentage}%</span>
      </div>
      <div className="skill-bar h-2.5 rounded-full overflow-hidden">
        <div 
          className="skill-progress h-full rounded-full"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar