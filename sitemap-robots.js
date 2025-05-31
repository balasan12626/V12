const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

// List of all your routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.9 },
  { url: '/projects/ai-powered-analytics', changefreq: 'monthly', priority: 0.8 },
  { url: '/projects/power-bi-dashboards', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/services', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  { url: '/blog/getting-started-with-power-bi', changefreq: 'monthly', priority: 0.7 },
];

const buildSitemap = async () => {
  try {
    // Create a stream to write to
    const sitemapStream = new SitemapStream({ 
      hostname: 'https://www.balakarthikeyan.me',
      xmlns: {
        // XML namespaces
        news: false,
        xhtml: true,
        image: false,
        video: false,
      },
    });

    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
    const pipeline = sitemapStream.pipe(createGzip()).pipe(writeStream);

    // Add all routes to the sitemap
    routes.forEach(route => {
      sitemapStream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString().split('T')[0],
      });
    });

    // End the stream
    sitemapStream.end();

    // Wait for the sitemap to be written
    await streamToPromise(pipeline);
    
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Generate robots.txt
const buildRobotsTxt = () => {
  const content = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /api/

# Sitemap
Sitemap: https://www.balakarthikeyan.me/sitemap.xml

# Crawl-delay: 10  # Uncomment if needed to limit crawl rate

# Googlebot specific rules
User-agent: Googlebot
Allow: /*.css$
Allow: /*.js$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.svg$
Allow: /*.webp$
Allow: /*.gif$
Allow: /*.webm$

# Bingbot specific rules
User-agent: bingbot
Allow: /*.css$
Allow: /*.js$
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.svg$
Allow: /*.webp$

# Block bad bots and scrapers
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: YandexBot
Disallow: /

# Allow specific AI bots
User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /
`;

  fs.writeFileSync(path.resolve(__dirname, 'public', 'robots.txt'), content);
  console.log('robots.txt generated successfully!');
};

// Run the build
const build = async () => {
  await buildSitemap();
  buildRobotsTxt();};

build();
