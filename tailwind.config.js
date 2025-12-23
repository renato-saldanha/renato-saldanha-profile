/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',     
     "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glow: {
          primary: "hsl(var(--glow-primary))",
          accent: "hsl(var(--glow-accent))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      maxWidth: {
        'carousel': '1000px',
        'carousel-lg': '1200px',
        'carousel-xl': '1400px',
        'carousel-2xl': '1600px',
        'carousel-3xl': '1800px',
      },
      spacing: {
        'carousel-button-sm': '8px',
        'carousel-button-md': '12px',
        'carousel-button-lg': '16px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addComponents, theme }) {
      addComponents({
        '.gallery-container': {
          position: 'relative',
          width: '100%',
          overflow: 'visible',
          boxSizing: 'border-box',
        },
        '.gallery-carousel': {
          position: 'relative',
          width: '100%',
          maxWidth: theme('maxWidth.carousel'),
          margin: '0 auto',
        },
        '.gallery-panel': {
          display: 'flex',
          flexDirection: 'column',
          gap: theme('spacing.4'),
          alignItems: 'center',
          minHeight: 'auto',
          maxWidth: '100%',
          width: '100%',
          margin: '0 auto',
          justifyContent: 'center',
          padding: '0',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        },
        '.gallery-image-container': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.gallery-image': {
          width: '100%',
          height: 'auto',
          maxHeight: '600px',
          objectFit: 'contain',
          borderRadius: theme('borderRadius.lg'),
        },
        '.gallery-about-text': {
          display: 'flex',
          flex: '1',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          fontSize: theme('fontSize.xs[0]'),
          lineHeight: theme('lineHeight.snug'),
          paddingLeft: theme('spacing.2.5'),
          paddingRight: theme('spacing.2.5'),
          margin: '0',
          textAlign: 'justify',
          order: '2',
          width: '100%',
        },
        '.gallery-carousel-button': {
          backgroundColor: 'hsl(var(--card) / 0.95)',
          border: '2px solid hsl(var(--border))',
          boxShadow: '0 4px 12px hsl(var(--background) / 0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: '1000',
          width: '36px',
          height: '36px',
          '&:hover:not(:disabled)': {
            backgroundColor: 'hsl(var(--primary) / 0.2)',
            borderColor: 'hsl(var(--primary))',
          },
        },
        '@media (min-width: 769px)': {
          '.gallery-panel': {
            flexDirection: 'row',
            gap: theme('spacing.8'),
            padding: theme('spacing.5'),
          },
          '.gallery-about-text': {
            order: '0',
            fontSize: theme('fontSize.sm[0]'),
            textAlign: 'center',
            paddingTop: theme('spacing.5'),
            paddingBottom: theme('spacing.5'),
            paddingLeft: '0',
            paddingRight: '0',
            maxWidth: '500px',
          },
          '.gallery-carousel-button': {
            width: '44px',
            height: '44px',
          },
        },
        '@media (min-width: 1025px)': {
          '.gallery-panel': {
            gap: theme('spacing.10'),
            maxWidth: theme('maxWidth.carousel'),
          },
          '.gallery-about-text': {
            fontSize: theme('fontSize.base[0]'),
            maxWidth: '600px',
          },
          '.gallery-carousel-button': {
            width: '48px',
            height: '48px',
          },
        },
        '.gallery-about-variant .gallery-image-container': {
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          display: 'block',
          position: 'relative',
          flex: 'none',
          alignItems: 'stretch',
          margin: '0',
        },
        '.gallery-about-variant .gallery-image': {
          aspectRatio: '4/3',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          maxHeight: 'none',
        },
        '@media (min-width: 769px)': {
          '.gallery-about-variant .gallery-panel': {
            alignItems: 'center',
            padding: theme('spacing.2.5'),
            gap: theme('spacing.5'),
          },
          '.gallery-about-variant .gallery-image-container': {
            flex: '0 0 auto',
            maxWidth: '400px',
            minWidth: '300px',
          },
          '.gallery-about-variant .gallery-about-text': {
            flex: '1',
            minWidth: '0',
            paddingTop: theme('spacing.2.5'),
            paddingBottom: theme('spacing.2.5'),
            paddingLeft: '0',
            paddingRight: '0',
          },
        },
        '@media (min-width: 1025px)': {
          '.gallery-about-variant .gallery-image-container': {
            maxWidth: '450px',
            minWidth: '350px',
          },
          '.gallery-about-variant .gallery-about-text': {
            maxWidth: 'none',
          },
        },
        '.modal-gallery-container .gallery-panel': {
          minHeight: '300px',
          maxHeight: '300px',
        },
        '.modal-gallery-container .gallery-image': {
          maxHeight: '300px',
        },
        '@media (min-width: 768px)': {
          '.modal-gallery-container .gallery-panel': {
            minHeight: '450px',
            maxHeight: '450px',
          },
          '.modal-gallery-container .gallery-image': {
            maxHeight: '450px',
          },
        },
        '@media (min-width: 1024px)': {
          '.modal-gallery-container .gallery-panel': {
            minHeight: '500px',
            maxHeight: '500px',
          },
          '.modal-gallery-container .gallery-image': {
            maxHeight: '500px',
          },
        },
      });
    },
  ],
}