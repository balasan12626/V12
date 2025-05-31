import { Helmet } from 'react-helmet-async';

const HomeSEO: React.FC = () => {
  const title = 'Balakarthikeyan | Data Analyst & AI Developer';
  const description = 'Data Analyst and AI Developer specializing in building intelligent applications with React, Python, and Machine Learning.';
  const keywords = [
    'Balakarthikeyan',
    'Data Analyst',
    'AI Developer',
    'Machine Learning',
    'React Developer',
    'Python Developer',
    'Full Stack Developer',
    'Portfolio',
    'Tamil Nadu Developer',
    'Web Developer India',
    'Data Science Projects',
    'AI Portfolio'
  ];
  const image = 'https://www.balakarthikeyan.me/images/og-image.jpg';
  const url = 'https://www.balakarthikeyan.me';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Balakarthikeyan" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default HomeSEO;
