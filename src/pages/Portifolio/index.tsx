import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import type { Portifolio } from '@/types'
import GaleriaFotos from '@/components/GaleriaFotos'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'
import { useRef, useCallback } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const DEFAULT_BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HwAFgwJ/lYtKuwAAAABJRU5ErkJggg==';

const portifolios: Portifolio[] = [
  {
    id: 'vmitech',
    titulo: 'VMITech',
    descricao: 'Auditoria e normalização de banco de dados (250 tabelas) de sistema de gestão de frotas e locação',
    altImagem: 'Logo da VMI Tech, empresa de gestão de frotas e locação',
    galeria: [
      { imagem: `/assets/vmitech/logo.png`, titulo: 'VMI Tech' },
    ]
  },
  {
    id: 'forgov',
    titulo: 'ForGov',
    descricao: 'Chatbot de IA via WhatsApp para gestores públicos municipais, com painel administrativo web',
    altImagem: 'Painel administrativo do ForGov mostrando login, dashboard, métricas e histórico de conversas do chatbot',
    galeria: [
      { imagem: `/assets/forgov/login.png`, titulo: 'Login via WhatsApp' },
      { imagem: `/assets/forgov/dashboard.png`, titulo: 'Painel inicial do administrador' },
      { imagem: `/assets/forgov/metricas.png`, titulo: 'Métricas de uso do chatbot' },
      { imagem: `/assets/forgov/conversas.png`, titulo: 'Histórico de conversas do chatbot' },
    ]
  },
  {
    id: 'Course App',
    titulo: 'Course App',
    descricao: 'Plataforma de treinamentos com login por e-mail e verificação em duas etapas, painel administrativo para turmas e recursos, e área do aluno com acompanhamento de progresso',
    altImagem: 'Portal de treinamentos Course App exibindo login, verificação em duas etapas e painéis do aluno e administrador',
    galeria: [
      { imagem: `/assets/course_app/front_course_login.png`, titulo: 'Login por e-mail' },
      { imagem: `/assets/course_app/front_course_f2a.png`, titulo: 'Verificação em duas etapas' },
      { imagem: `/assets/course_app/front_course_admin.png`, titulo: 'Painel administrativo de turmas e recursos' },
      { imagem: `/assets/course_app/front_course_aluno.png`, titulo: 'Área do aluno com cursos e progresso' },
    ]
  }
]

export default function Portifolio() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';
  const [modalAberto, setModalAberto] = useState(false)
  const [portifolioSelecionado, setPortifolioSelecionado] = useState<Portifolio | null>(null)
  const botaoAbrirRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

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

  const abrirModal = (portifolio: Portifolio, botao: HTMLButtonElement) => {
    botaoAbrirRef.current = botao;
    setPortifolioSelecionado(portifolio)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setTimeout(() => {
      setPortifolioSelecionado(null)
      botaoAbrirRef.current?.focus()
    }, 300)
  }

  useEffect(() => {
    if (modalAberto && modalRef.current) {
      modalRef.current.focus()
    }
  }, [modalAberto])

  const handleFocusTrap = useCallback((e: KeyboardEvent) => {
    if (!modalAberto || !modalRef.current) return
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [modalAberto])

  useEffect(() => {
    if (!modalAberto) return
    document.addEventListener('keydown', handleFocusTrap)
    return () => document.removeEventListener('keydown', handleFocusTrap)
  }, [modalAberto, handleFocusTrap])

  const renderSkeletons = () => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <SEO
        title="Portfólio - Projetos em Destaque"
        description="Conheça os projetos desenvolvidos por GenIA: VMITech, ForGov, Course App e outras soluções em IA e desenvolvimento Full Stack. Soluções desenvolvidas com foco em qualidade e inovação."
        keywords="Portfólio, Projetos, VMITech, ForGov, Course App, Desenvolvimento de Software, React, Next.js, Delphi, React Native"
        url={`${baseUrl}/Portifolio`}
      />
      <section className="section-padding relative min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-2">
            <span className="gradient-text">Projetos em Destaque</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Soluções desenvolvidas com foco em qualidade e inovação.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(portifolios.length ? portifolios : []).map((portifolio, index) => {
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
                        alt={portifolio.altImagem || `Screenshot do projeto ${portifolio.titulo} - ${portifolio.descricao}`}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        priority={index === 0}
                        placeholder="blur"
                        blurDataURL={DEFAULT_BLUR}
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span 
                          className="px-3 py-1 text-xs font-mono bg-background/80 backdrop-blur-sm border border-primary/50 rounded-full text-primary"
                          aria-label={`Galeria com ${portifolio.galeria.length} ${portifolio.galeria.length === 1 ? 'imagem' : 'imagens'}`}
                        >
                          {portifolio.galeria.length} {portifolio.galeria.length === 1 ? 'imagem' : 'imagens'}
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
                  onClick={(e) => abrirModal(portifolio, e.currentTarget)}
                  aria-label={`Ver detalhes do projeto ${portifolio.titulo}`}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {!portifolios.length && renderSkeletons()}
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
            role="presentation"
          >
            <motion.div
              ref={modalRef}
              className="glass-card w-[92vw] sm:w-[88vw] max-w-5xl h-[85vh] sm:h-[80vh] max-h-[700px] overflow-hidden flex flex-col m-4 sm:m-0"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-titulo"
              tabIndex={-1}
            >
              {/* Header do Modal */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-border flex-shrink-0">
                <h2 id="modal-titulo" className="text-xl sm:text-2xl font-bold text-foreground">{portifolioSelecionado.titulo}</h2>
                <button
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-foreground hover:bg-secondary hover:border-primary/50 transition-all"
                  onClick={fecharModal}
                  aria-label="Fechar modal"
                  type="button"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Galeria no Modal */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-visible p-4 sm:p-6 modal-gallery-container" style={{ contain: 'layout style paint' }}>
                <GaleriaFotos itens={portifolioSelecionado.galeria} onImageClick={setZoomedImage} />
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
    <AnimatePresence>
      {zoomedImage && (
        <motion.div
          className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center cursor-zoom-out p-4"
          onClick={() => setZoomedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={zoomedImage}
              alt="Imagem ampliada"
              fill
              className="object-contain"
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}