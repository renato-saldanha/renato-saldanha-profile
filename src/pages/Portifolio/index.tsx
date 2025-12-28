import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import type { Portifolio } from '@/types'
import GaleriaFotos from '@/components/GaleriaFotos'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'

const portifolios: Portifolio[] = [
  {
    id: 'crm-leads',
    titulo: 'CRM Leads',
    descricao: 'Mini CRM para gerenciamento de leads e oportunidades de venda',
    galeria: [
      { imagem: `/assets/crm_leads/crm_leads.png` },
      { imagem: `/assets/crm_leads/crm_leads2.png` },
    ]
  },
  {
    id: 'Course App',
    titulo: 'Course App',
    descricao: 'Portal de cursos online',
    galeria: [
      { imagem: `/assets/course_app/front_course_login.png` },
      { imagem: `/assets/course_app/front_course_f2a.png` },
      { imagem: `/assets/course_app/front_course_admin.png` },
      { imagem: `/assets/course_app/front_course_aluno.png` },
    ]
  }
]

export default function Portifolio() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';
  const [modalAberto, setModalAberto] = useState(false)
  const [portifolioSelecionado, setPortifolioSelecionado] = useState<Portifolio | null>(null)

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalAberto) {
        setModalAberto(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [modalAberto])

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalAberto])

  const abrirModal = (portifolio: Portifolio) => {
    setPortifolioSelecionado(portifolio)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setTimeout(() => {
      setPortifolioSelecionado(null)
    }, 300)
  }

  return (
    <>
      <SEO
        title="Portfólio - Projetos em Destaque"
        description="Conheça os projetos desenvolvidos por Renato Saldanha: CRM Leads, Course App e outras soluções em IA e desenvolvimento Full Stack. Soluções desenvolvidas com foco em qualidade e inovação."
        keywords="Portfólio, Projetos, CRM, Course App, Desenvolvimento de Software, Projetos de IA, React, Next.js, Delphi, React Native"
        url={`${baseUrl}/Portifolio`}
      />
      <section className="py-32 relative min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Projetos em Destaque</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Soluções desenvolvidas com foco em qualidade e inovação.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {portifolios.map((portifolio, index) => {
            const primeiraImagem = portifolio.galeria && portifolio.galeria.length > 0 
              ? portifolio.galeria[0].imagem 
              : null;
            
            return (
              <motion.div
                key={portifolio.id}
                className="group relative flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="glass-card overflow-hidden hover:border-primary/50 transition-all duration-500 flex flex-col h-full">
                  {/* Image */}
                  {primeiraImagem && (
                    <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-overlay z-10" />
                      <Image
                        src={primeiraImagem}
                        alt={`Screenshot do projeto ${portifolio.titulo} - ${portifolio.descricao}`}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        priority={index === 0}
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 text-xs font-mono bg-background/80 backdrop-blur-sm border border-primary/50 rounded-full text-primary">
                          {portifolio.galeria.length} imagens
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors min-h-[28px]">
                      {portifolio.titulo}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow min-h-[60px]">
                      {portifolio.descricao}
                    </p>

                    <div className="flex gap-3 mt-auto">
                      <Button 
                        variant="cyber" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => abrirModal(portifolio)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal com Galeria */}
      <AnimatePresence>
        {modalAberto && portifolioSelecionado && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/95"
            onClick={fecharModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="glass-card w-[95vw] sm:w-[90vw] max-w-5xl h-[90vh] sm:h-[85vh] max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col m-4 sm:m-0"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header do Modal */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{portifolioSelecionado.titulo}</h2>
                <button
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:border-primary/50 transition-all"
                  onClick={fecharModal}
                  aria-label="Fechar modal"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Galeria no Modal */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-visible p-4 sm:p-6 modal-gallery-container" style={{ contain: 'layout style paint' }}>
                <GaleriaFotos itens={portifolioSelecionado.galeria} />
              </div>

              {/* Descrição no Modal */}
              <div className="p-4 sm:p-6 border-t border-border flex-shrink-0">
                <p className="text-muted-foreground text-center text-sm sm:text-base">{portifolioSelecionado.descricao}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  )
}