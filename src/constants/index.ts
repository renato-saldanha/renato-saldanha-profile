// Placeholder neutro (1x1 cinza) para imagens com `src` string — imports estáticos
// usam o blur gerado pelo Next automaticamente.
export const DEFAULT_BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HwAFgwJ/lYtKuwAAAABJRU5ErkJggg==';

// Configurações do EmailJS
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_pkx86ls',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_o0ckaid',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'ne0bpE6PGjvhdKtUZ',
} as const;
