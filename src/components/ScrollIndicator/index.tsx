import { useEffect, useRef } from 'react';

export default function ScrollIndicator() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

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
    const applyTransform = (scale = 1) => {
      if (!cursorRef.current || isMobileRef.current) return;
      const { x, y } = positionRef.current;
      cursorRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%)) scale(${scale})`;
    };

    const updateCursorPosition = (e: MouseEvent) => {
      if (!cursorRef.current || isMobileRef.current) return;
      positionRef.current = { x: e.clientX, y: e.clientY };
      applyTransform(scaleRef.current);
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
        scaleRef.current = 1.2;
        applyTransform(scaleRef.current);
      } else {
        scaleRef.current = 1;
        applyTransform(scaleRef.current);
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
        transform: 'translate(-50%, -50%) scale(1)',
        willChange: 'transform, opacity',
        transition: 'opacity 0.1s ease-out',
      }}
      aria-hidden="true"
      role="presentation"
    >
      <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
        <div className="w-1 h-2 bg-primary rounded-full" />
      </div>
    </div>
  );
}

