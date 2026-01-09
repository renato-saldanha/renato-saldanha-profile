## Atualizações de Acessibilidade (WCAG 2.1 A/AA)

### Visão geral
- Implementações alinhadas ao checklist do `ACCESSIBILITY_AUDIT.md`.
- Foco em navegação por teclado, ARIA, feedback de status e respeito a `prefers-reduced-motion`.

### Principais mudanças por área
- **Estrutura global**
  - Skip link para `#main-content` e landmark principal em `_app.tsx`.
  - Remoção da meta viewport duplicada em `_document.tsx`.
  - Estilos globais de foco reforçados, ajuste de contraste (`--muted-foreground`), fallback de `gradient-text` e media query para reduzir animações em `globals.css`.
- **Header / Navegação**
  - Logo com `Link` acessível, `aria-current` nos links.
  - Menu mobile com `aria-expanded`/`aria-controls`; CTA “Hire me” com indicação de nova aba e ícones decorativos ocultos (`aria-hidden`).
- **Home**
  - Ícone Sparkles marcado como decorativo.
  - Estatísticas reestruturadas para `dl/dt/dd`; botões com `aria-label` descritivos.
- **Portfólio**
  - Modal com `role="dialog"`, `aria-modal`, `aria-labelledby`, foco inicial/retorno e trap de foco.
  - Botões “Ver Detalhes” com contexto do projeto; badge de imagens com `aria-label`; alt das galerias detalhados.
  - Slides da galeria com posição (`aria-label`); textos do carousel traduzidos.
- **Contato**
  - Campos com `aria-invalid`/`aria-describedby`; validação de email e erro exibidos apenas após blur/touched.
  - Erros com `role="alert"`; sucesso com `role="status"`; loader acessível (sem emoji).
- **Animações e cursor**
  - Canvas do fundo com `role="img"` e descrição; animação pausada para `prefers-reduced-motion`.
  - Cursor custom decorativo (`aria-hidden`), preservando o cursor nativo.
- **Footer e Social**
  - Email dentro de `<address>` com `aria-label`; links sociais indicam abertura em nova aba.

### Notas de compatibilidade
- Respeito a `prefers-reduced-motion` pode desativar animações do fundo e do cursor em ambientes com essa preferência.
- Carrossel mantém atalhos de setas e anuncia slide atual via `aria-label` nos items.

### Sugestões rápidas de teste
- Navegação por teclado: Tab/Shift+Tab alcançam skip link, menu mobile, modal (foco preso) e formulário.
- Leitor de tela: verificar anúncio do modal, mensagens de erro/sucesso no contato e contagem de imagens no portfólio.
- Preferências: ativar “reduzir movimento” no SO/navegador e confirmar que o fundo animado não executa.
