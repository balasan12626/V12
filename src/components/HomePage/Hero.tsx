import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Cpu, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const skills = [
  { name: 'React', icon: <Code className="w-5 h-5" /> },
  { name: 'Node.js', icon: <Database className="w-5 h-5" /> },
  { name: 'AI/ML', icon: <Cpu className="w-5 h-5" /> },
  { name: 'Data Analysis', icon: <BarChart2 className="w-5 h-5" /> },
];

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCA0MEgxNVYyMEg0MFYxNUgyMFYwSDEwVjE1SDBWMjBIMTBWNDBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transforming Ideas into{' '}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Hi, I'm Balakarthikeyan. I build exceptional digital experiences with modern web technologies and AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link 
                to="/projects" 
                className="relative group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative z-10 flex items-center">
                  Explore My Work <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <a 
                href="#contact" 
                className="px-8 py-4 border-2 border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 hover:border-white/40"
              >
                Let's Collaborate
              </a>
            </div>

            {/* Tech stack */}
            <div className="mt-12">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-4">TECH STACK</p>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50 hover:border-purple-500/50 transition-colors"
                  >
                    {skill.icon}
                    <span className="text-white font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 0 }}
        animate={{ 
          opacity: [0.4, 1, 0.4],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
