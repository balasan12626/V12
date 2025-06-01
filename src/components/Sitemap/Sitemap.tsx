import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component serves the sitemap.xml file for development.
 * In production, the static file from the public directory should be served directly by the web server.
 */
const Sitemap = () => {
  const location = useLocation();

  useEffect(() => {
    // This will only run in development
    if (process.env.NODE_ENV === 'development') {
      // In development, we'll redirect to the public/sitemap.xml file
      window.location.href = '/sitemap.xml';
    }
  }, [location]);

  // In production, this component won't be rendered as the server will serve the static file directly
  return null;
};

export default Sitemap;
