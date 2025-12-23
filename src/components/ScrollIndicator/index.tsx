import { useEffect, useRef } from 'react';

export default function ScrollIndicator() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Verifica se é dispositivo móvel
    const checkMobile = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches || 
                     window.innerWidth < 768;
      isMobileRef.current = mobile;
      
      // Restaura cursor padrão em mobile
      if (mobile) {
        document.body.style.cursor = 'auto';
        document.documentElement.style.cursor = 'auto';
        if (cursorRef.current) {
          cursorRef.current.style.display = 'none';
        }
      } else {
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';
        if (cursorRef.current) {
          cursorRef.current.style.display = 'block';
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Se for mobile, não adiciona listeners de mouse
    if (isMobileRef.current) {
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }

    if (!cursorRef.current) return;

    // Atualiza posição diretamente no DOM para melhor performance
    const updateCursorPosition = (e: MouseEvent) => {
      if (cursorRef.current && !isMobileRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && !isMobileRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && !isMobileRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    // Detecta elementos interativos para feedback visual
    const handleMouseOver = (e: MouseEvent) => {
      if (!cursorRef.current || isMobileRef.current) return;
      
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      if (isInteractive) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1.2)';
      } else {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    // Inicializa cursor como visível
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '1';
    }

    // Adiciona listeners de mouse
    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  // Sempre renderiza, mas controla visibilidade via CSS
  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: '0px',
        top: '0px',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        transition: 'transform 0.05s linear, opacity 0.1s ease-out',
      }}
    >
      <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
        <div className="w-1 h-2 bg-primary rounded-full" />
      </div>
    </div>
  );
}

