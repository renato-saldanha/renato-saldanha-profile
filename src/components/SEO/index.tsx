import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const defaultTitle = 'GenIA - Engenheiro de Softwares';
const defaultDescription = 'Portfólio de GenIA - Engenheiro de Softwares especializado em soluções multiplataforma. Transformando dados em decisões e algoritmos em inovação.';
const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';
const defaultImage = `${defaultUrl}/assets/profile.png`;

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  keywords = 'Desenvolvedor Full Stack, Engenheiro de Software, Inteligência Artificial, React, Next.js, Delphi, React Native, Desenvolvimento de Software, Programação, Portfólio',
  image = defaultImage,
  url = defaultUrl,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const fullTitle = title !== defaultTitle ? `${title} | ${defaultTitle}` : defaultTitle;
  const fullUrl = url.startsWith('http') ? url : `${defaultUrl}${url}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GenIA" />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="GenIA - Portfólio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional */}
      <meta name="geo.region" content="BR-MT" />
      <meta name="geo.placename" content="Cuiabá" />
    </Head>
  );
}

