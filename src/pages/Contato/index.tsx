import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, AlertCircle, Mail, Send } from 'lucide-react'
import { useEmailJS } from '@/hooks/useEmailJS'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'

export default function Contato() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")
  
  const { sendEmail, isLoading, isSuccess, error, reset } = useEmailJS()

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const contato = {
      nome,
      email,
      mensagem
    }

    sendEmail(contato).then(() => {
      if (isSuccess) {
        limparCampos()
      }
    })
  }

  function limparCampos() {
    setTimeout(() => {
      reset()
      setMensagem("")
      setNome("")
      setEmail("")
    }, 5000);
  }

  return (
    <>
      <SEO
        title="Contato"
        description="Entre em contato com Renato Saldanha para colaborações, projetos ou consultoria em desenvolvimento Full Stack e Engenharia de IA. Vamos transformar ideias em realidade."
        keywords="Contato, Consultoria, Projetos, Desenvolvimento de Software, Freelancer, Desenvolvedor Full Stack, Engenheiro de IA"
        url={`${baseUrl}/Contato`}
      />
      <section className="py-32 relative min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Vamos Construir Algo Incrível</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interessado em colaborar em projetos ou precisa de consultoria? 
              Entre em contato e vamos transformar ideias em realidade.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium text-foreground">
                      Nome
                    </label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                      aria-label="Nome completo"
                      aria-required="true"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                      aria-label="Endereço de email"
                      aria-required="true"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-sm font-medium text-foreground">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                    placeholder="Sua mensagem..."
                    aria-label="Sua mensagem"
                    aria-required="true"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant={isSuccess ? "default" : "glow"}
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Enviando...
                    </>
                  ) : isSuccess ? (
                    <>
                      <BadgeCheck className="w-5 h-5" />
                      Email enviado!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  )
}