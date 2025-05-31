import { Helmet } from 'react-helmet-async';

interface Person {
  '@type': 'Person';
  name: string;
  url: string;
  image: string;
  sameAs: string[];
  jobTitle: string;
}

interface WebSite {
  '@type': 'WebSite';
  name: string;
  url: string;
}

const StructuredData = () => {
  const person: Person = {
    "@type": "Person",
    name: "Balakarthikeyan",
    url: "https://www.balakarthikeyan.me",
    image: "https://www.balakarthikeyan.me/profile.jpg",
    sameAs: [
      "https://github.com/balasan12626",
      "https://www.linkedin.com/in/balakarthikeyan02122005",
      "https://www.instagram.com/bala_karthi_2"
    ],
    jobTitle: "Data Analyst & AI Developer"
  };

  const website: WebSite = {
    "@type": "WebSite",
    name: "Balakarthikeyan - Portfolio",
    url: "https://www.balakarthikeyan.me"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          ...person
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          ...website
        })}
      </script>
    </Helmet>
  );
};

export default StructuredData;
