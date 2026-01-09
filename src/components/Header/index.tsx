import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Brain, Menu, X, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: "Home", href: "/Home" },
  { label: "Sobre", href: "/Sobre" },
  { label: "Portfólio", href: "/Portifolio" },
  { label: "Contato", href: "/Contato" },
]

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  function toHome() {
    router.push("/")
    setIsOpen(false)
  }

  function handleCVClick() {
    // Abre o PDF do Google Drive em nova aba para visualização e download
    window.open('https://drive.google.com/file/d/1vtRwTgja94IINpXHq1_prnoWgCHi2md4/view?usp=drive_link', '_blank')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-2 sm:mx-4 mt-2 sm:mt-4">
        <div className="glass-card px-3 sm:px-8 py-3 sm:py-5">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
              aria-label="Renato Saldanha - Ir para página inicial"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="font-bold text-base sm:text-xl">
                <span className="text-foreground">Renato</span>
                <span className="text-primary">_Saldanha</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={router.pathname === link.href ? 'page' : undefined}
                  className={`text-base transition-colors font-medium ${
                    router.pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                variant="outline" 
                size="default"
                onClick={handleCVClick}
                className="px-5 border-primary text-primary hover:bg-primary/10 group"
                aria-label="Baixar currículo (abre em nova aba)"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Baixar CV
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <span className="sr-only">(abre em nova aba)</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                className="md:hidden mt-4 pt-4 border-t border-border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      aria-current={router.pathname === link.href ? 'page' : undefined}
                      className={`text-sm transition-colors ${
                        router.pathname === link.href
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                  className="w-full mt-2 border-primary text-primary hover:bg-primary/10 group"
                    onClick={() => {
                      handleCVClick()
                      setIsOpen(false)
                    }}
                    aria-label="Baixar currículo (abre em nova aba)"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                  Baixar CV
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}