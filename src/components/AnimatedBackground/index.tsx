import { useEffect, useRef, useMemo, useState } from "react";

interface AnimatedBackgroundProps {
  nodeCount?: number;
  connectionDistance?: number;
  dotCount?: number;
  showFloatingElements?: boolean;
}

interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number;
  activation: number;
  pulsePhase: number;
}

interface NeuralConnection {
  from: number;
  to: number;
  weight: number;
  signalProgress: number;
  signalActive: boolean;
  pulsePhase: number;
}

export default function AnimatedBackground({
  nodeCount = 40,
  connectionDistance = 200,
  dotCount = 15,
  showFloatingElements = false
}: AnimatedBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const detectMobile = () => {
      if (typeof window === "undefined") return false;
      const ua = navigator.userAgent || "";
      return (
        /iPhone|iPad|iPod|Android/i.test(ua) ||
        navigator.maxTouchPoints > 1 ||
        window.innerWidth < 768
      );
    };

    setIsMobile(detectMobile());

    const resizeHandler = () => setIsMobile(detectMobile());
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const effectiveNodeCount = isMobile ? Math.max(12, Math.floor(nodeCount / 2)) : nodeCount;
  const effectiveDotCount = isMobile ? Math.max(6, Math.floor(dotCount / 2)) : dotCount;

  // Generate static positions for animated dots
  const animatedDots = useMemo(() => {
    return Array.from({ length: effectiveDotCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6
    }));
  }, [effectiveDotCount]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    if (isMobile) return;

    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network structure - organized in layers
    const layerCount = 4; // Input, Hidden1, Hidden2, Output
    const nodesPerLayer = Math.ceil(effectiveNodeCount / layerCount);
    const nodes: NeuralNode[] = [];
    const connections: NeuralConnection[] = [];
    
    // Initialize nodes in layers
    for (let layer = 0; layer < layerCount; layer++) {
      const layerNodes = layer === layerCount - 1 ? effectiveNodeCount - (layerCount - 1) * nodesPerLayer : nodesPerLayer;
      const layerX = (canvas.width / (layerCount + 1)) * (layer + 1);
      const layerHeight = canvas.height * 0.7;
      const startY = (canvas.height - layerHeight) / 2;

      for (let i = 0; i < layerNodes; i++) {
        const ySpacing = layerHeight / (layerNodes + 1);
        const nodeY = startY + ySpacing * (i + 1) + (Math.random() - 0.5) * 30;
        
        nodes.push({
          x: layerX + (Math.random() - 0.5) * 40,
          y: nodeY,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 2,
          layer: layer,
          activation: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    }

    // Create connections between layers
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && otherNode.layer > node.layer && Math.random() > 0.6) {
          const distance = Math.sqrt(
            Math.pow(otherNode.x - node.x, 2) + Math.pow(otherNode.y - node.y, 2)
          );
          
          if (distance < connectionDistance) {
            connections.push({
              from: i,
              to: j,
              weight: Math.random() * 0.5 + 0.3,
              signalProgress: 0,
              signalActive: false,
              pulsePhase: Math.random() * Math.PI * 2
            });
          }
        }
      });
    });

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // ~60fps

      // Update nodes with gentle drift
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Gentle boundary constraints
        if (node.x < 50 || node.x > canvas.width - 50) node.vx *= -0.8;
        if (node.y < 50 || node.y > canvas.height - 50) node.vy *= -0.8;

        node.x = Math.max(50, Math.min(canvas.width - 50, node.x));
        node.y = Math.max(50, Math.min(canvas.height - 50, node.y));

        // Update activation pulse
        node.pulsePhase += 0.02;
        node.activation = 0.3 + Math.sin(node.pulsePhase) * 0.4;
      });

      // Draw connections first (so nodes appear on top)
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        if (!fromNode || !toNode) return;

        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Connection pulse effect
        conn.pulsePhase += 0.015;
        const pulseIntensity = 0.3 + Math.sin(conn.pulsePhase) * 0.2;
        const opacity = conn.weight * pulseIntensity * (1 - distance / connectionDistance);

        // Draw connection line with gradient
        const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity * 0.4})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(147, 51, 234, ${opacity * 0.4})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = conn.weight * 1.5;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Draw signal pulse along connection
        if (Math.random() > 0.98) {
          conn.signalActive = true;
          conn.signalProgress = 0;
        }

        if (conn.signalActive) {
          conn.signalProgress += 0.03;
          if (conn.signalProgress > 1) {
            conn.signalActive = false;
          } else {
            const signalX = fromNode.x + dx * conn.signalProgress;
            const signalY = fromNode.y + dy * conn.signalProgress;
            const signalSize = 4 * (1 - conn.signalProgress);
            
            const signalGradient = ctx.createRadialGradient(
              signalX, signalY, 0,
              signalX, signalY, signalSize * 2
            );
            signalGradient.addColorStop(0, 'rgba(0, 255, 255, 1)');
            signalGradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.6)');
            signalGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

            ctx.fillStyle = signalGradient;
            ctx.beginPath();
            ctx.arc(signalX, signalY, signalSize * 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(0, 255, 255, 1)';
            ctx.beginPath();
            ctx.arc(signalX, signalY, signalSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Draw nodes (neurons)
      nodes.forEach((node) => {
        // Outer glow based on activation
        const glowRadius = node.radius * (3 + node.activation * 2);
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        
        const primaryColor = node.layer === 0 ? '0, 255, 255' : 
                            node.layer === layerCount - 1 ? '147, 51, 234' : 
                            '0, 255, 255';
        
        glowGradient.addColorStop(0, `rgba(${primaryColor}, ${0.6 * node.activation})`);
        glowGradient.addColorStop(0.5, `rgba(${primaryColor}, ${0.3 * node.activation})`);
        glowGradient.addColorStop(1, `rgba(${primaryColor}, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner core (neuron body)
        const coreGradient = ctx.createRadialGradient(
          node.x - node.radius * 0.3, node.y - node.radius * 0.3, 0,
          node.x, node.y, node.radius
        );
        coreGradient.addColorStop(0, `rgba(${primaryColor}, 1)`);
        coreGradient.addColorStop(0.7, `rgba(${primaryColor}, 0.8)`);
        coreGradient.addColorStop(1, `rgba(${primaryColor}, 0.4)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Center dot
        ctx.fillStyle = `rgba(${primaryColor}, 1)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [connectionDistance, effectiveNodeCount, isMobile, isClient]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden cyber-grid" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/96 to-background" style={{ zIndex: 1 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 45%, hsl(var(--background)) 100%)', zIndex: 2 }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden cyber-grid" style={{ zIndex: 0 }}>
      {/* Animated Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="Animação decorativa de rede neural com nós conectados"
        style={{ zIndex: 0 }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" style={{ zIndex: 1 }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s', zIndex: 1 }} />
      
      {/* Additional Animated Dots */}
      {animatedDots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute animated-dot"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
            zIndex: 1
          }}
        >
          <div className="w-2 h-2 bg-primary rounded-full glow-dot" />
        </div>
      ))}
      
      {/* Floating Elements (optional) */}
      {showFloatingElements && (
        <>
          <div className="absolute top-20 left-10 floating" style={{ animationDelay: '0s', zIndex: 1 }}>
            <div className="w-16 h-16 border border-primary/30 rounded-lg rotate-45 glow-border" />
          </div>
          <div className="absolute bottom-32 right-20 floating" style={{ animationDelay: '2s', zIndex: 1 }}>
            <div className="w-12 h-12 border border-accent/30 rounded-full" />
          </div>
        </>
      )}
    </div>
  );
}


