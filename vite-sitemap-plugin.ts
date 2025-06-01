import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export default function viteSitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    configureServer(server) {
      // Middleware to handle sitemap.xml requests
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/sitemap.xml') {
            const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
            if (fs.existsSync(sitemapPath)) {
              const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
              res.setHeader('Content-Type', 'application/xml');
              res.statusCode = 200;
              res.end(sitemap);
              return;
            }
          }
          next();
        });
      };
    }
  };
}
