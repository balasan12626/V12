import React from 'react';
import Hero from './Hero';
import FeaturedProjects from './FeaturedProjects';
import SkillsOverview from './SkillsOverview';
import HomeSEO from './HomeSEO';

const Home: React.FC = () => {
  return (
    <>
      <HomeSEO />
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
    </>
  );
};

export default Home;