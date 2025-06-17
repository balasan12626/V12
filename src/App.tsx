import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import ScrollToTop from './components/Common/ScrollToTop';
import Layout from './components/Layout/Layout';
import Home from './components/HomePage/Home';
import About from './components/AboutPage/About';
import Projects from './components/ProjectsPage/Projects';
import Skills from './components/SkillsPage/Skills';
import Contact from './components/ContactPage/Contact';
import Article from './components/aritcalpage/Article';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import Sitemap from './components/Sitemap/Sitemap';

// Component to handle 404 errors
const CatchAllRoutes = () => {
  const location = useLocation();
  // Keep navigate for potential future use
  // const navigate = useNavigate();

  useEffect(() => {
    // Log 404 errors to analytics
    console.log(`Route not found: ${location.pathname}`);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="skills" element={<Skills />} />
        <Route path="contact" element={<Contact />} />
        <Route path="articles" element={<Article />} />
        <Route path="articles/:id" element={<Article />} />
        <Route path="sitemap.xml" element={<Sitemap />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Wrap components with error boundary (commented out as not used in current implementation)
// const HomeWithBoundary = withErrorBoundary(Home);
// const AboutWithBoundary = withErrorBoundary(About);
// const ProjectsWithBoundary = withErrorBoundary(Projects);
// const SkillsWithBoundary = withErrorBoundary(Skills);
// const ContactWithBoundary = withErrorBoundary(Contact);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary fallback={<div className="min-h-screen flex items-center justify-center"><h1>Something went wrong. Please refresh the page.</h1></div>}>
        <Router>
          <ScrollToTop />
          <CatchAllRoutes />
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
