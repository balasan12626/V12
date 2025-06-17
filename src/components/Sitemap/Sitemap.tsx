import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * This component redirects to the dynamic sitemap.xml from the backend API.
 * The sitemap is automatically generated and includes all articles.
 */
const Sitemap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Always redirect to the dynamic sitemap from backend
    // This ensures the sitemap is always up-to-date with latest articles
    const backendUrl = 'http://localhost:8000/sitemap.xml';
    
    // For production, update this to your production API URL
    const sitemapUrl = process.env.NODE_ENV === 'production' 
      ? 'https://www.balakarthikeyan.me/sitemap.xml'  // This will hit the backend
      : backendUrl;
    
    window.location.href = sitemapUrl;
  }, [location]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-purple-500 mx-auto mb-6"></div>
        <h2 className="text-white text-xl font-semibold mb-2">Loading Sitemap...</h2>
        <p className="text-gray-400">Redirecting to dynamic sitemap with latest articles</p>
      </div>
    </div>
  );
};

export default Sitemap;
