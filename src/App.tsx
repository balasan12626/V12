import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/Common/ScrollToTop';
import Layout from './components/Layout/Layout';
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import Projects from './components/ProjectsPage/Projects';
import Skills from './components/SkillsPage/Skills';
import Contact from './components/ContactPage/Contact';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
