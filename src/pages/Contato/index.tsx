import { FormEvent, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, AlertCircle, Send, Loader2 } from 'lucide-react'
import { useEmailJS } from '@/hooks/useEmailJS'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'

export default function Contato() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://renatosaldanha.dev';
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [campoErros, setCampoErros] = useState<{nome?: string, email?: string, mensagem?: string}>({})
  const [touched, setTouched] = useState({ nome: false, email: false, mensagem: false })
  
  const { sendEmail, isLoading, isSuccess, error, reset } = useEmailJS()

  const validarEmail = (valor: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setTouched({ nome: true, email: true, mensagem: true });

    const novosErros: {nome?: string, email?: string, mensagem?: string} = {}
    if (!nome.trim()) novosErros.nome = 'Informe seu nome'
    if (!email.trim()) novosErros.email = 'Informe seu email'
    if (email && !validarEmail(email)) novosErros.email = 'Por favor, insira um email válido'
    if (!mensagem.trim()) novosErros.mensagem = 'Digite uma mensagem'
    setCampoErros(novosErros)
    if (Object.keys(novosErros).length) return;

    const contato = {
      nome,
      email,
      mensagem
    }

    sendEmail(contato)
  }

  const limparCampos = useCallback(() => {
    setTimeout(() => {
      reset()
      setMensagem("")
      setNome("")
      setEmail("")
    }, 5000);
  }, [reset])

  useEffect(() => {
    if (isSuccess) {
      limparCampos()
    }
  }, [isSuccess, limparCampos])

  useEffect(() => {
    const novosErros: { nome?: string; email?: string; mensagem?: string } = {};

    if (touched.nome && !nome.trim()) {
      novosErros.nome = 'Informe seu nome';
    }

    if (touched.email) {
      if (!email.trim()) {
        novosErros.email = 'Informe seu email';
      } else if (!validarEmail(email)) {
        novosErros.email = 'Por favor, insira um email válido';
      }
    }

    if (touched.mensagem && !mensagem.trim()) {
      novosErros.mensagem = 'Digite uma mensagem';
    }

    setCampoErros(novosErros);
  }, [email, mensagem, nome, touched.email, touched.mensagem, touched.nome]);

  return (
    <>
      <SEO
        title="Contato"
        description="Entre em contato com GenIA para colaborações, projetos ou consultoria em engenharia de software. Vamos transformar ideias em realidade."
        keywords="Contato, Consultoria, Projetos, Desenvolvimento de Software, Freelancer, Desenvolvedor Full Stack, Engenheiro de Software"
        url={`${baseUrl}/Contato`}
      />
      <section className="section-padding relative min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-2">
              <span className="gradient-text">Vamos Construir Algo Incrível</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4">
              Interessado em colaborar em projetos ou precisa de consultoria? 
              Entre em contato e vamos transformar futuro em realidade!
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
                      onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        touched.nome && campoErros.nome ? 'border-destructive focus:ring-destructive' : 'border-border'
                      }`}
                      placeholder="Seu nome completo"
                      aria-label="Nome completo"
                      aria-required="true"
                      aria-invalid={touched.nome && !!campoErros.nome}
                      aria-describedby={touched.nome && campoErros.nome ? "nome-erro" : undefined}
                      required
                    />
                    {touched.nome && campoErros.nome && (
                      <span id="nome-erro" className="text-destructive text-sm">{campoErros.nome}</span>
                    )}
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
                      onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        touched.email && campoErros.email ? 'border-destructive focus:ring-destructive' : 'border-border'
                      }`}
                      placeholder="seu@email.com"
                      aria-label="Endereço de email"
                      aria-required="true"
                      aria-invalid={touched.email && !!campoErros.email}
                      aria-describedby={touched.email && campoErros.email ? "email-erro" : undefined}
                      required
                    />
                    {touched.email && campoErros.email && (
                      <span id="email-erro" className="text-destructive text-sm">{campoErros.email}</span>
                    )}
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
                      onBlur={() => setTouched(prev => ({ ...prev, mensagem: true }))}
                    rows={6}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical ${
                        touched.mensagem && campoErros.mensagem ? 'border-destructive focus:ring-destructive' : 'border-border'
                      }`}
                    placeholder="Sua mensagem..."
                    aria-label="Sua mensagem"
                    aria-required="true"
                      aria-invalid={touched.mensagem && !!campoErros.mensagem}
                      aria-describedby={touched.mensagem && campoErros.mensagem ? "mensagem-erro" : undefined}
                    required
                  />
                  {touched.mensagem && campoErros.mensagem && (
                    <span id="mensagem-erro" className="text-destructive text-sm">{campoErros.mensagem}</span>
                  )}
                </div>

                {error && (
                  <div 
                    className="flex items-center gap-2 p-4 rounded-lg bg-destructive/20 border-2 border-destructive text-destructive animate-shake"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {isSuccess && (
                  <div 
                    role="status" 
                    aria-live="polite"
                    className="sr-only"
                  >
                    Email enviado com sucesso!
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
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      <span>Enviando...</span>
                      <span className="sr-only">Por favor aguarde</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <BadgeCheck className="w-5 h-5" aria-hidden="true" />
                      Email enviado!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
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