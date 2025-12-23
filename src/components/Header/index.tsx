import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Brain, Menu, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
      <div className="mx-4 mt-4">
        <div className="glass-card px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); toHome(); }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">
                <span className="text-foreground">Renato</span>
                <span className="text-primary">_Saldanha</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
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
                className="px-5 border-primary text-primary hover:bg-primary/10"
              >
                <Download className="w-4 h-4" />
                Hire me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
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
                  className="w-full mt-2 border-primary text-primary hover:bg-primary/10"
                  onClick={() => {
                    handleCVClick()
                    setIsOpen(false)
                  }}
                >
                  <Download className="w-4 h-4" />
                  Hire me
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}