import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/router";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-mono text-muted-foreground">Desenvolvedor Full Stack & Engenheiro de IA</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up animate-delay-100">
          <span className="text-foreground">Construindo o</span>
          <br />
          <span className="gradient-text glow-text">Futuro com IA</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-200">
          Desenvolvendo soluções inteligentes que transformam dados em decisões 
          e algoritmos em inovação. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-300">
          <Button 
            variant="glow" 
            size="xl"
            onClick={() => router.push('/Portifolio')}
            aria-label="Ver projetos no portfólio"
          >
            Ver Projetos
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            variant="cyber" 
            size="xl"
            onClick={() => router.push('/Contato')}
            aria-label="Entre em contato pelo formulário"
          >
            Entre em Contato
          </Button>
        </div>

        {/* Stats */}
        <dl className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mt-20 animate-fade-up animate-delay-400">
          {[
            { value: "2+", label: "Projetos de IA" },
            { value: "8+", label: "Anos de Experiência" },            
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="text-sm text-muted-foreground font-mono order-2">{stat.label}</dt>
              <dd className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      
    </section>
  );
}