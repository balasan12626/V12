import { Helmet } from 'react-helmet-async';
import React from 'react';

declare module 'react-helmet-async' {
  interface HelmetProps {
    children?: React.ReactNode;
  }
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tag?: string | string[];
  keywords?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  locale?: string;
  siteName?: string;
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
  additionalMetaTags?: Array<{
    property?: string;
    name?: string;
    content: string;
    [key: string]: any;
  }>;
}

const SEO: React.FC<SEOProps> = ({
  title = import.meta.env.VITE_APP_TITLE || 'Balakarthikeyan | Data Analyst & Power BI Developer',
  description = import.meta.env.VITE_APP_DESCRIPTION || 'Professional Data Analyst and Power BI Developer specializing in Python, Machine Learning, and Data Visualization.',
  image = import.meta.env.VITE_APP_IMAGE || 'https://www.balakarthikeyan.me/og-image.jpg',
  url = import.meta.env.VITE_APP_URL || 'https://www.balakarthikeyan.me',
  type = 'website',
  author = import.meta.env.VITE_APP_AUTHOR || 'Balakarthikeyan',
  publishedTime,
  modifiedTime,
  section,
  tag,
  keywords = import.meta.env.VITE_APP_KEYWORDS || 'data analyst, Power BI, Python, machine learning, data visualization, portfolio, data science, data analysis, AI, artificial intelligence, data engineer, data visualization expert, business intelligence, data analytics, data mining, SQL, Excel, Tableau, data storytelling, statistical analysis',
  noIndex = false,
  noFollow = false,
  locale = import.meta.env.VITE_APP_LOCALE || 'en_IN',
  siteName = import.meta.env.VITE_APP_SITE_NAME || 'Balakarthikeyan - Portfolio',
  twitterCardType = 'summary_large_image',
  twitterSite = import.meta.env.VITE_APP_TWITTER || '@balakarthi',
  twitterCreator = import.meta.env.VITE_APP_TWITTER || '@balakarthi',
  canonicalUrl,
  structuredData,
  additionalMetaTags = [],
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : url;
  const canonical = canonicalUrl || currentUrl;
  const robotsContent = [];
  
  if (noIndex) robotsContent.push('noindex');
  if (noFollow) robotsContent.push('nofollow');
  if (robotsContent.length === 0) robotsContent.push('index, follow');

  // Generate meta tags for article tags
  const articleTags = [];
  if (tag) {
    const tags = Array.isArray(tag) ? tag : [tag];
    articleTags.push(
      ...tags.map((t, i) => (
        <meta key={`tag-${i}`} property="article:tag" content={t} />
      ))
    );
  }

  // Add Open Graph and Twitter meta tags
  const metaTags = [
    // Primary Meta Tags
    { name: 'title', content: title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: author },
    { name: 'robots', content: robotsContent.join(', ') },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#0a0a0a' },
    
    // Open Graph / Facebook
    { property: 'og:type', content: type },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: locale },
    
    // Twitter
    { name: 'twitter:card', content: twitterCardType },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:site', content: twitterSite },
    { name: 'twitter:creator', content: twitterCreator },
    
    // Additional meta tags
    ...additionalMetaTags,
  ];

  // Add article-specific meta tags
  if (type === 'article') {
    if (publishedTime) {
      metaTags.push({ property: 'article:published_time', content: publishedTime });
    }
    if (modifiedTime) {
      metaTags.push({ property: 'article:modified_time', content: modifiedTime });
    }
    if (section) {
      metaTags.push({ property: 'article:section', content: section });
    }
  }

  // Add structured data if provided
  let structuredDataScript = null;
  if (structuredData) {
    structuredDataScript = (
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          ...structuredData,
        })}
      </script>
    );
  }

  return (
    <Helmet>
      <title>{title}</title>
      
      {/* Meta Tags */}
      {metaTags.map((tag, index) => (
        <meta
          key={`meta-${index}`}
          {...Object.entries(tag).reduce((acc, [key, value]) => {
            if (value !== undefined) {
              acc[key] = value;
            }
            return acc;
          }, {} as Record<string, string>)}
        />
      ))}
      
      {/* Article Tags */}
      {type === 'article' && articleTags}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Structured Data */}
      {structuredDataScript}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;
