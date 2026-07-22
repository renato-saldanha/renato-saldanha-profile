import Script from 'next/script';

interface StructuredDataProps {
  type?: 'Person' | 'Website';
}

export default function StructuredData({ type = 'Person' }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'GenIA',
    jobTitle: 'Engenheiro de Softwares',
    description: 'Engenheiro de Softwares especializado em soluções multiplataforma',
    url: baseUrl,
    image: `${baseUrl}/assets/profile.png`,
    sameAs: [
      // Adicione suas redes sociais aqui quando disponíveis
      // 'https://github.com/renatosaldanha',
      // 'https://linkedin.com/in/renatosaldanha',
      // 'https://twitter.com/renatosaldanha',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cuiabá',
      addressRegion: 'MT',
      addressCountry: 'BR',
    },
    knowsAbout: [
      'Inteligência Artificial',
      'Desenvolvimento Full Stack',
      'React',
      'Next.js',
      'Delphi',
      'React Native',
      'Machine Learning',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Análise e Desenvolvimento de Sistemas',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GenIA - Portfólio',
    url: baseUrl,
    description: 'Portfólio de GenIA - Engenheiro de Softwares',
    author: {
      '@type': 'Person',
      name: 'GenIA',
    },
  };

  const data = type === 'Person' ? personData : websiteData;

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

