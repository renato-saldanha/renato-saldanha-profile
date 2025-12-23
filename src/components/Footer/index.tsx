import { Mail } from 'lucide-react'
import SocialIcons from '@/components/SocialIcons'

export default function Footer() {
  return (
    <footer className="relative py-12">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-12 text-center relative overflow-visible mb-10">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              {/* Nome com borda cyberpunk */}
              <div className="flex justify-center mb-8 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-bold">
                      <span className="gradient-text">
                        Renato Saldanha
                      </span>
                    </h3>
              </div>

              {/* Ícones Sociais */}
              <div className="mb-8 md:mb-10">
                <SocialIcons 
                  orientation="horizontal" 
                  withAnimation={true}
                />
              </div>

              {/* Email destacado */}
              <div className="flex justify-center">
                <a 
                  href="mailto:ranalisesaldanha@gmail.com"
                  className="email-highlight group"
                >
                  <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-base md:text-lg font-semibold gradient-text">
                    ranalisesaldanha@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="text-center pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-mono">
              © 2024 Renato Saldanha. <span className="text-primary">Todos os direitos reservados</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}