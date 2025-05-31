import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your domain - update this with your actual domain
const domain = 'https://yourdomain.com';

// List all your routes here
const routes = [
  '/',
  '/about',
  '/projects',
  '/contact',
  // Add all other routes
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${domain}${route}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
</urlset>`;

writeFileSync(join(__dirname, '../public/sitemap.xml'), sitemap);

console.log('Sitemap generated at public/sitemap.xml');
