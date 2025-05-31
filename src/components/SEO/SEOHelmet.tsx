import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({
  title = 'Balakarthikeyan | Data Analyst & AI Developer',
  description = 'Data Analyst and AI Developer specializing in building intelligent applications with React, Python, and Machine Learning.',
  keywords = [
    'Balakarthikeyan',
    'Data Analyst',
    'AI Developer',
    'Machine Learning',
    'React Developer',
    'Python Developer',
    'Full Stack Developer',
    'Portfolio',
    'Tamil Nadu Developer'
  ],
  image = 'https://www.balakarthikeyan.me/images/og-image.jpg',
  url = 'https://www.balakarthikeyan.me',
  type = 'website'
}) => {
  const siteTitle = 'Balakarthikeyan | Data Analyst & AI Developer';
  const siteDescription = 'Data Analyst and AI Developer specializing in building intelligent applications with React, Python, and Machine Learning.';
  
  const metaDescription = description || siteDescription;
  const metaTitle = title ? `${title} | ${siteTitle.split('|')[0].trim()}` : siteTitle;

  return (
    <Helmet
      title={metaTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: keywords.join(', '),
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: type,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:image',
          content: image,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: metaTitle,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: image,
        },
      ]}
    />
  );
};

export default SEO;
