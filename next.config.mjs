/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Fixa a raiz do projeto: sem isso o Next detecta o package-lock.json
  // solto em /home/renato-saldanha e passa a rastrear a home inteira do usuário.
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/webp', 'image/avif'],    
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // optimizeCss: true, // Desabilitado temporariamente devido a problemas de build
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configurações de segurança
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            // img-src: placeholders blur do next/image são data: URIs.
            // connect-src: o @emailjs/browser faz fetch direto para api.emailjs.com.
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://api.emailjs.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
