# Auditoria de Acessibilidade - Portfólio Renato Saldanha

## Sumário Executivo

Este documento apresenta uma análise completa de acessibilidade do portfólio, identificando **28 pontos** que necessitam de implementação ou correção para conformidade com as diretrizes WCAG 2.1 (níveis A e AA).

---

## Tabela de Severidade

| Severidade | Quantidade | Descrição |
|------------|------------|-----------|
| 🔴 Crítico | 6 | Impede usuários de tecnologias assistivas de usar funcionalidades essenciais |
| 🟠 Alto | 10 | Dificulta significativamente a navegação e uso |
| 🟡 Médio | 8 | Afeta a experiência mas não impede o uso |
| 🟢 Baixo | 4 | Melhorias recomendadas para excelência |

---

## Problemas por Componente

### 1. `src/pages/_app.tsx` e `src/pages/_document.tsx`

#### 🔴 1.1 Falta de Skip Link (WCAG 2.4.1)
**Arquivo:** `_app.tsx`  
**Problema:** Não existe um link para pular a navegação e ir direto ao conteúdo principal.  
**Impacto:** Usuários de teclado precisam navegar por todos os links do header em cada página.

**Solução:**
```tsx
// Em _app.tsx, adicionar antes do Header:
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
>
  Pular para o conteúdo principal
</a>

// E no main:
<main id="main-content" className="pt-6 relative z-10">
```

#### 🟠 1.2 Viewport Meta Tag no Local Incorreto (WCAG 1.4.4)
**Arquivo:** `_document.tsx`  
**Problema:** A meta tag viewport está no `<Head>` do `_document.tsx`, mas o Next.js recomenda que seja gerenciada automaticamente ou no `_app.tsx`.  
**Impacto:** Pode haver conflitos e comportamentos inesperados.

**Solução:**
```tsx
// Remover do _document.tsx e deixar o Next.js gerenciar, ou mover para _app.tsx com next/head
```

---

### 2. `src/components/Header/index.tsx`

#### 🔴 2.1 Menu Mobile sem aria-expanded (WCAG 4.1.2)
**Problema:** O botão do menu mobile não indica seu estado (aberto/fechado) para leitores de tela.

**Código Atual:**
```tsx
<button
  className="md:hidden text-foreground"
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle menu"
>
```

**Solução:**
```tsx
<button
  className="md:hidden text-foreground"
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
</button>

// E no menu:
<div id="mobile-menu" className="md:hidden mt-4 pt-4 border-t border-border">
```

#### 🟠 2.2 Logo com href="#" e preventDefault (WCAG 2.4.4)
**Problema:** O logo usa `href="#"` com `onClick` que previne o comportamento padrão. Isso é anti-padrão e confunde tecnologias assistivas.

**Código Atual:**
```tsx
<a 
  href="#" 
  onClick={(e) => { e.preventDefault(); toHome(); }}
  className="flex items-center gap-3 group cursor-pointer"
>
```

**Solução:**
```tsx
<Link 
  href="/"
  className="flex items-center gap-3 group"
  aria-label="Renato Saldanha - Ir para página inicial"
>
```

#### 🟡 2.3 Links sem aria-current (WCAG 2.4.4)
**Problema:** Links de navegação não indicam qual é a página atual para leitores de tela.

**Solução:**
```tsx
<Link
  key={link.label}
  href={link.href}
  aria-current={router.pathname === link.href ? 'page' : undefined}
  className={`...`}
>
```

#### 🟡 2.4 Botão CV abre nova aba sem aviso (WCAG 3.2.5)
**Problema:** O botão "Hire me" abre link externo sem indicar que será em nova janela.

**Solução:**
```tsx
<Button 
  variant="outline" 
  size="default"
  onClick={handleCVClick}
  aria-label="Baixar currículo (abre em nova aba)"
>
  <Download className="w-4 h-4" aria-hidden="true" />
  <span>Hire me</span>
  <span className="sr-only">(abre em nova aba)</span>
</Button>
```

#### 🟡 2.5 Ícones decorativos sem aria-hidden (WCAG 1.1.1)
**Problema:** Ícones do Lucide não têm `aria-hidden="true"` explícito.

**Solução:** Adicionar `aria-hidden="true"` em todos os ícones decorativos:
```tsx
<Brain className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
```

---

### 3. `src/pages/Home/index.tsx`

#### 🟡 3.1 Ícone Sparkles sem aria-hidden (WCAG 1.1.1)
**Problema:** Ícone decorativo é lido por leitores de tela.

**Solução:**
```tsx
<Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
```

#### 🟡 3.2 Estatísticas sem estrutura semântica (WCAG 1.3.1)
**Problema:** As estatísticas usam `<div>` genéricos sem relação semântica.

**Código Atual:**
```tsx
{[
  { value: "2+", label: "Projetos de IA" },
  { value: "8+", label: "Anos de Experiência" },            
].map((stat) => (
  <div key={stat.label} className="text-center">
    <div className="text-3xl...">{stat.value}</div>
    <div className="text-sm...">{stat.label}</div>
  </div>
))}
```

**Solução:**
```tsx
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
```

#### 🟢 3.3 Botões com destino implícito (WCAG 2.4.4)
**Problema:** "Ver Projetos" e "Entre em Contato" poderiam ser mais descritivos.

**Solução:**
```tsx
<Button 
  variant="glow" 
  size="xl"
  onClick={() => router.push('/Portifolio')}
  aria-label="Ver projetos no portfólio"
>
```

---

### 4. `src/pages/Portifolio/index.tsx`

#### 🔴 4.1 Modal sem role="dialog" (WCAG 4.1.2)
**Problema:** O modal não é identificado como diálogo para tecnologias assistivas.

**Código Atual:**
```tsx
<motion.div
  className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/95"
  onClick={fecharModal}
  ...
>
```

**Solução:**
```tsx
<motion.div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-titulo"
  className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/95"
  onClick={fecharModal}
  ...
>
  ...
  <h2 id="modal-titulo" className="text-xl sm:text-2xl font-bold text-foreground">
    {portifolioSelecionado.titulo}
  </h2>
```

#### 🔴 4.2 Foco não gerenciado no modal (WCAG 2.4.3)
**Problema:** Ao abrir o modal, o foco não é movido para ele. Ao fechar, não retorna ao elemento que o abriu.

**Solução:**
```tsx
const botaoAbrirRef = useRef<HTMLButtonElement | null>(null);
const modalRef = useRef<HTMLDivElement>(null);

const abrirModal = (portifolio: Portifolio, buttonRef: HTMLButtonElement) => {
  botaoAbrirRef.current = buttonRef;
  setPortifolioSelecionado(portifolio);
  setModalAberto(true);
}

useEffect(() => {
  if (modalAberto && modalRef.current) {
    modalRef.current.focus();
  }
}, [modalAberto]);

const fecharModal = () => {
  setModalAberto(false);
  setTimeout(() => {
    setPortifolioSelecionado(null);
    botaoAbrirRef.current?.focus(); // Retorna foco
  }, 300);
}

// No modal:
<motion.div
  ref={modalRef}
  tabIndex={-1}
  role="dialog"
  ...
>
```

#### 🟠 4.3 Trap de foco ausente no modal (WCAG 2.4.3)
**Problema:** O foco pode sair do modal enquanto ele está aberto.

**Solução:** Implementar focus trap:
```tsx
import { useCallback, useEffect } from 'react';

// Hook customizado ou usar biblioteca como focus-trap-react
useEffect(() => {
  if (!modalAberto) return;
  
  const handleTabKey = (e: KeyboardEvent) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  document.addEventListener('keydown', handleTabKey);
  return () => document.removeEventListener('keydown', handleTabKey);
}, [modalAberto]);
```

#### 🟠 4.4 Botão "Ver Detalhes" não identifica projeto (WCAG 2.4.4)
**Problema:** Múltiplos botões com mesmo texto não indicam qual projeto será aberto.

**Solução:**
```tsx
<Button 
  variant="cyber" 
  size="sm" 
  className="flex-1"
  onClick={() => abrirModal(portifolio)}
  aria-label={`Ver detalhes do projeto ${portifolio.titulo}`}
>
  Ver Detalhes
</Button>
```

#### 🟡 4.5 Imagens do grid sem alt descritivo adequado (WCAG 1.1.1)
**Problema:** Alt text é genérico quando não há descrição específica.

**Solução:** Melhorar descrições no array de portfólios:
```tsx
const portifolios: Portifolio[] = [
  {
    id: 'crm-leads',
    titulo: 'CRM Leads',
    descricao: 'Mini CRM para gerenciamento de leads e oportunidades de venda',
    altImagem: 'Dashboard do sistema CRM Leads mostrando lista de leads e métricas',
    galeria: [...]
  },
```

#### 🟢 4.6 Badge "X imagens" não é anunciado corretamente (WCAG 1.3.1)
**Problema:** O contador de imagens no canto poderia ter contexto melhor.

**Solução:**
```tsx
<span 
  className="px-3 py-1 text-xs font-mono bg-background/80 backdrop-blur-sm border border-primary/50 rounded-full text-primary"
  aria-label={`Galeria com ${portifolio.galeria.length} imagens`}
>
  {portifolio.galeria.length} imagens
</span>
```

---

### 5. `src/pages/Contato/index.tsx`

#### 🟠 5.1 Mensagem de erro sem role="alert" (WCAG 4.1.3)
**Problema:** Erros de validação não são anunciados automaticamente por leitores de tela.

**Código Atual:**
```tsx
{error && (
  <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive">
    <AlertCircle size={16} />
    <span className="text-sm">{error}</span>
  </div>
)}
```

**Solução:**
```tsx
{error && (
  <div 
    role="alert"
    aria-live="assertive"
    className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/50 text-destructive"
  >
    <AlertCircle size={16} aria-hidden="true" />
    <span className="text-sm">{error}</span>
  </div>
)}
```

#### 🟠 5.2 Estado de sucesso não anunciado (WCAG 4.1.3)
**Problema:** Quando o email é enviado com sucesso, não há anúncio para leitores de tela.

**Solução:**
```tsx
{isSuccess && (
  <div 
    role="status" 
    aria-live="polite"
    className="sr-only"
  >
    Email enviado com sucesso!
  </div>
)}
```

#### 🟡 5.3 Campos sem aria-describedby para erros (WCAG 3.3.1)
**Problema:** Campos de formulário não estão associados às suas mensagens de erro.

**Solução:**
```tsx
const [campoErros, setCampoErros] = useState<{nome?: string, email?: string, mensagem?: string}>({});

<input
  id="nome"
  aria-invalid={!!campoErros.nome}
  aria-describedby={campoErros.nome ? "nome-erro" : undefined}
  ...
/>
{campoErros.nome && (
  <span id="nome-erro" className="text-destructive text-sm">{campoErros.nome}</span>
)}
```

#### 🟡 5.4 Loading spinner com emoji (WCAG 1.1.1)
**Problema:** O emoji ⏳ pode não ser interpretado corretamente.

**Código Atual:**
```tsx
{isLoading ? (
  <>
    <span className="animate-spin">⏳</span>
    Enviando...
  </>
```

**Solução:**
```tsx
{isLoading ? (
  <>
    <span className="animate-spin" aria-hidden="true">
      <Loader2 className="w-5 h-5" />
    </span>
    <span>Enviando...</span>
    <span className="sr-only">Por favor aguarde</span>
  </>
```

---

### 6. `src/components/AnimatedBackground/index.tsx`

#### 🔴 6.1 Canvas sem alternativa textual (WCAG 1.1.1)
**Problema:** O canvas animado não tem descrição para usuários que não podem vê-lo.

**Solução:**
```tsx
<canvas
  ref={canvasRef}
  className="absolute inset-0 w-full h-full"
  style={{ zIndex: 0 }}
  role="img"
  aria-label="Animação decorativa de rede neural com nós conectados"
/>
```

#### 🔴 6.2 Animações não respeitam prefers-reduced-motion (WCAG 2.3.3)
**Problema:** Usuários que preferem menos movimento não conseguem desabilitar as animações.

**Solução:**
```tsx
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // Verificar preferência do usuário
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Renderizar versão estática ou não renderizar
    return;
  }

  // ... resto do código de animação
}, [nodeCount, connectionDistance]);
```

E no CSS global:
```css
@media (prefers-reduced-motion: reduce) {
  .animated-dot,
  .floating,
  .pulse-glow,
  .glow-dot,
  .animate-pulse,
  [class*="animate-"] {
    animation: none !important;
    transition: none !important;
  }
}
```

---

### 7. `src/components/ScrollIndicator/index.tsx`

#### 🔴 7.1 Cursor nativo removido em desktop (WCAG 2.1.1)
**Problema:** Remover o cursor nativo pode ser problemático para usuários com baixa visão ou que dependem do cursor para orientação.

**Código Atual:**
```tsx
document.body.style.cursor = 'none';
document.documentElement.style.cursor = 'none';
```

**Solução:**
```tsx
// Respeitar preferências do usuário
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && !mobile) {
  // Manter cursor original visível, adicionar cursor custom como complemento
  // OU oferecer toggle para desabilitar cursor custom
}
```

#### 🟠 7.2 Cursor custom sem propósito semântico (WCAG 1.3.3)
**Problema:** O indicador de scroll customizado parece um mouse/scroll indicator mas não comunica isso.

**Solução:**
```tsx
<div
  ref={cursorRef}
  className="fixed pointer-events-none z-[9999]"
  aria-hidden="true" // Já que é puramente decorativo
  role="presentation"
  ...
>
```

---

### 8. `src/components/GaleriaFotos/index.tsx`

#### 🟠 8.1 Slides sem identificação de posição (WCAG 1.3.1)
**Problema:** Usuários não sabem em qual slide estão ou quantos existem.

**Solução:**
```tsx
<CarouselItem 
  key={i} 
  className="pl-0 flex-none min-w-0 basis-full"
  aria-label={`Slide ${i + 1} de ${itens.length}`}
>
```

#### 🟡 8.2 Botões de navegação com texto em inglês (WCAG 3.1.2)
**Problema:** "Previous slide" e "Next slide" estão em inglês enquanto o site é em português.

**Solução no arquivo `src/components/ui/carousel.tsx`:**
```tsx
<span className="sr-only">Slide anterior</span>
// e
<span className="sr-only">Próximo slide</span>
```

---

### 9. `src/components/Footer/index.tsx`

#### 🟡 9.1 Link de email sem aria-label descritivo (WCAG 2.4.4)
**Problema:** O link de email poderia ter contexto adicional.

**Solução:**
```tsx
<a 
  href="mailto:ranalisesaldanha@gmail.com"
  className="email-highlight group"
  aria-label="Enviar email para ranalisesaldanha@gmail.com"
>
```

#### 🟢 9.2 Informações de contato sem elemento address (WCAG 1.3.1)
**Problema:** Informações de contato poderiam usar o elemento semântico `<address>`.

**Solução:**
```tsx
<address className="not-italic">
  <a 
    href="mailto:ranalisesaldanha@gmail.com"
    ...
  >
```

---

### 10. `src/styles/globals.css`

#### 🟠 10.1 Focus styles podem ser insuficientes (WCAG 2.4.7)
**Problema:** Alguns elementos podem não ter indicadores de foco visíveis o suficiente.

**Solução:** Adicionar estilos de foco globais mais robustos:
```css
@layer base {
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
  
  /* Para elementos que não devem ter outline padrão */
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    @apply ring-2 ring-primary ring-offset-2 ring-offset-background outline-none;
  }
}
```

#### 🟠 10.2 Contraste de texto gradient-text (WCAG 1.4.3)
**Problema:** Texto com gradiente pode ter contraste insuficiente em certas partes.

**Solução:** Garantir que a cor de fallback tenha contraste adequado:
```css
.gradient-text {
  @apply bg-clip-text text-transparent;
  background-image: var(--gradient-glow);
  /* Fallback para alta acessibilidade */
  @supports not (background-clip: text) {
    color: hsl(var(--primary));
    background: none;
  }
}
```

#### 🟡 10.3 Texto muted-foreground pode ter baixo contraste (WCAG 1.4.3)
**Problema:** A cor `--muted-foreground: 215 20% 65%` pode não ter contraste 4.5:1 em todos os contextos.

**Solução:** Ajustar a variável para garantir contraste mínimo:
```css
--muted-foreground: 215 20% 70%; /* Aumentar luminosidade */
```

---

### 11. `src/pages/Sobre/index.tsx`

#### 🟡 11.1 Seção sem landmark identificável (WCAG 1.3.1)
**Problema:** A seção não tem aria-labelledby para identificação por leitores de tela.

**Solução:**
```tsx
<section 
  className="pt-8 pb-6 md:pt-10 md:pb-8 relative"
  aria-labelledby="sobre-titulo"
>
  <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-4 md:mb-6">
      <h2 id="sobre-titulo" className="text-4xl md:text-5xl font-bold mb-2">
        <span className="gradient-text">Sobre Mim</span>
      </h2>
    </div>
```

---

### 12. `src/components/SocialIcons/index.tsx`

#### 🟢 12.1 Bom uso de aria-label ✅
**Status:** Implementado corretamente.

#### 🟢 12.2 Links externos sem indicação visual (WCAG 3.2.5)
**Problema:** Links abrem em nova aba sem indicação visual.

**Solução:**
```tsx
<motion.a
  key={social.label}
  href={social.href}
  target="_blank"
  rel="noopener noreferrer"
  className={linkClass}
  aria-label={`${social.label} (abre em nova aba)`}
  ...
>
```

---

## Checklist de Implementação

### Prioridade 1 - Crítico (Implementar Imediatamente)
- [ ] Adicionar skip link para navegação por teclado
- [ ] Implementar role="dialog" e aria-modal no modal do portfólio
- [ ] Gerenciar foco corretamente no modal (focus trap)
- [ ] Adicionar alternativa textual ao canvas
- [ ] Respeitar prefers-reduced-motion em todas as animações
- [ ] Revisar remoção do cursor nativo

### Prioridade 2 - Alto (Implementar em Breve)
- [ ] Adicionar aria-expanded no menu mobile
- [ ] Corrigir logo com href="#"
- [ ] Adicionar role="alert" em mensagens de erro
- [ ] Identificar posição dos slides na galeria
- [ ] Melhorar indicadores de foco
- [ ] Revisar contraste do gradient-text
- [ ] Botão "Ver Detalhes" com contexto do projeto
- [ ] Anunciar estado de sucesso no formulário
- [ ] Focus trap no modal
- [ ] Campos com aria-describedby para erros

### Prioridade 3 - Médio (Melhorias Importantes)
- [ ] Adicionar aria-current nos links de navegação
- [ ] Indicar abertura em nova aba no botão CV
- [ ] Adicionar aria-hidden em ícones decorativos
- [ ] Usar estrutura semântica nas estatísticas (dl/dt/dd)
- [ ] Traduzir textos sr-only do carousel para português
- [ ] Melhorar aria-label do link de email
- [ ] Adicionar aria-labelledby nas seções
- [ ] Substituir emoji de loading por ícone

### Prioridade 4 - Baixo (Melhorias de Excelência)
- [ ] Adicionar contexto aos botões da home
- [ ] Usar elemento address para contato
- [ ] Adicionar contexto ao badge de imagens
- [ ] Indicação visual de links externos em redes sociais

---

## Ferramentas Recomendadas para Testes

1. **Lighthouse** - Auditoria automática do Chrome
2. **axe DevTools** - Extensão para detecção de problemas
3. **WAVE** - Ferramenta de avaliação de acessibilidade
4. **NVDA/VoiceOver** - Testes com leitores de tela reais
5. **Navegação por teclado** - Testar Tab, Enter, Escape, Setas

---

## Referências WCAG

| Critério | Descrição | Nível |
|----------|-----------|-------|
| 1.1.1 | Conteúdo Não Textual | A |
| 1.3.1 | Informações e Relações | A |
| 1.3.3 | Características Sensoriais | A |
| 1.4.3 | Contraste (Mínimo) | AA |
| 1.4.4 | Redimensionar Texto | AA |
| 2.1.1 | Teclado | A |
| 2.3.3 | Animação de Interações | AAA |
| 2.4.1 | Ignorar Blocos | A |
| 2.4.3 | Ordem de Foco | A |
| 2.4.4 | Finalidade do Link (em Contexto) | A |
| 2.4.7 | Foco Visível | AA |
| 3.1.2 | Idioma das Partes | AA |
| 3.2.5 | Alteração Mediante Solicitação | AAA |
| 3.3.1 | Identificação de Erro | A |
| 4.1.2 | Nome, Função, Valor | A |
| 4.1.3 | Mensagens de Status | AA |

---

## Links Úteis

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
