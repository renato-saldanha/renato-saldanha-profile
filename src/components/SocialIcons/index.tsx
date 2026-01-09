import { Github, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/renato-saldanha-a318067b/', label: 'LinkedIn', delay: 0 },
  { icon: Instagram, href: 'https://www.instagram.com/renato.saldanha.1/', label: 'Instagram', delay: 0.2 },
  { icon: Github, href: 'https://github.com/renato-saldanha/', label: 'GitHub', delay: 0.4 },
];

interface SocialIconsProps {
  orientation?: 'vertical' | 'horizontal';
  withAnimation?: boolean;
  className?: string;
  size?: 'small' | 'default';
}

export default function SocialIcons({ 
  orientation = 'vertical', 
  withAnimation = true,
  className = '',
  size = 'default'
}: SocialIconsProps) {
  // Gap baseado no tamanho
  const gapClass = size === 'small' ? 'gap-2' : 'gap-4';
  
  // Classes padronizadas para o container
  const containerClass = orientation === 'vertical' 
    ? `flex flex-col ${gapClass}` 
    : `flex justify-center ${gapClass}`;

  // Tamanhos baseados no prop size
  const linkSizeClass = size === 'small' 
    ? 'w-8 h-8 rounded-lg' 
    : 'w-12 h-12 rounded-xl';
  
  const iconSizeClass = size === 'small'
    ? 'w-3.5 h-3.5'
    : 'w-5 h-5';

  // Classes padronizadas para os links - sempre os mesmos efeitos
  const linkClass = `electric-pulse ${linkSizeClass} glass-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group`;

  // Classes padronizadas para os ícones
  const iconClass = `${iconSizeClass} group-hover:scale-110 transition-transform`;

  return (
    <div className={`${containerClass} ${className}`}>
      {socialLinks.map((social) => {
        const iconElement = <social.icon className={iconClass} />;
        const ariaLabel = `${social.label} (abre em nova aba)`;

        // Sempre usa motion.a quando withAnimation é true para efeitos consistentes
        if (withAnimation) {
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={ariaLabel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: social.delay }}
              whileHover={{ scale: 1.1, x: -4 }}
              style={{ animationDelay: `${social.delay}s` }}
            >
              {iconElement}
            </motion.a>
          );
        }

        // Fallback sem animação, mas mantendo os mesmos estilos visuais
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label={ariaLabel}
          >
            {iconElement}
          </a>
        );
      })}
    </div>
  );
}

