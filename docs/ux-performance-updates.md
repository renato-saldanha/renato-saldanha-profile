## Atualizações de UX e Performance

### Visão geral
- Implementações referentes ao `UX_PERFORMANCE_AUDIT.md`, com foco em mobile, carregamento percebido e redução de jank visual sem alterar funcionalidades.

### Performance e assets
- Fundo animado agora detecta mobile e `prefers-reduced-motion`: desativa o canvas e usa fallback estático, reduzindo CPU/bateria; nós/pontos animados diminuídos e animações mais lentas.
- Fonts Google preloaded em `_document.tsx`, removendo @import e mitigando FOUT.
- Imagens do portfólio e galerias usam `placeholder="blur"` com `blurDataURL` seguro para evitar CLS; modal de zoom com blur e carregamento suave.
- EmailJS carregado dinamicamente apenas no envio do formulário.
- Imports do framer-motion usados de forma pontual (menu móvel e transições de página) para evitar bundle extra.

### Layout e responsividade
- Header mais compacto em mobile (margens/padding reduzidos); SocialBar reposicionada para não sobrepor conteúdo.
- Grid do portfólio com colunas intermediárias (sm/md) e gaps ajustados; modal com dimensões menores em mobile; títulos da home reduzidos em telas pequenas.
- Utilitários `.section-padding`/`.section-padding-sm` adicionados para consistência vertical entre seções.

### Animações e transições
- Menu mobile com `AnimatePresence` (fade/altura) e página com transições suaves em `_app.tsx`.
- Cursor custom usa `transform` em vez de `left/top` (menos lag) e respeita mobile/prefers-reduced-motion.
- Animações globais (grid, pulse, dots) desaceleradas para menor jank.

### Estados e feedback
- Formulário de contato com validação inline (touched), bordas/estado de erro, loader consistente (`Loader2`) e mensagem de erro com destaque/animation shake; estados de sucesso/erro preservados.
- Skeletons prontos para listas do portfólio, evitando flash de conteúdo vazio.

### Navegação e consistência
- CTA de CV renomeado para “Baixar CV”, com ícone de nova aba; logo com hover/cursor claros.
- Carousel da galeria ganhou dots de paginação e labels em PT-BR; botões mantêm sr-only em português.
- Footer com ano dinâmico; variantes de botão alinhadas aos usos (glow primário, cyber secundário, outline terciário).

### Observações de teste rápido
- Mobile: header/social não sobrepõem conteúdo; modal do portfólio cabe em viewport e mantém foco/scroll lock.
- Acessibilidade: fundo animado é decorativo (`role="img"` + descrição); reduzir movimento desliga o canvas e suaviza cursor/animations.
- Performance: carregamento inicial mostra blur em imagens, fontes já preloaded; transições de página não travam.
