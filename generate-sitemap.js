import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  // Your website URL - make sure it's correct
  const siteUrl = 'https://www.balakarthikeyan.me';

  // List all your routes here
  const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/projects', changefreq: 'monthly', priority: 0.8 },
    { url: '/skills', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    // Add all other routes your website has
  ];

  // Create a stream to write to
  const sitemapStream = new SitemapStream({ hostname: siteUrl });

  // Write the sitemap to the public directory
  const writeStream = createWriteStream(path.join('public', 'sitemap.xml'));

  // Pipe the sitemap to the file
  sitemapStream.pipe(writeStream);

  // Add all routes to the sitemap
  for (const route of routes) {
    await new Promise((resolve) => {
      sitemapStream.write(route, resolve);
    });
  }

  // End the stream
  sitemapStream.end();

  return new Promise((resolve) => {
    writeStream.on('finish', () => {
      console.log('Sitemap generated successfully!');
      resolve();
    });
  });
}

generateSitemap().catch(console.error);
