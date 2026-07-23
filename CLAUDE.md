# CLAUDE.md

Guia de convenções deste repositório. Curto de propósito — é carregado toda sessão.

## Stack

Next.js 15 (Pages Router) + React 19 + TypeScript strict + Tailwind CSS. Alias `@/*` → `./src/*` (definido em `tsconfig.json`).

## Estilo de código

ESLint (`next/core-web-vitals`) e Prettier já cobrem formatação e regras básicas — rode `npm run lint` e `npm run format` em vez de discutir estilo manualmente.

## Separação de responsabilidades

- Lógica pura, sem estado nem efeito colateral → `src/lib`.
- Lógica com estado ou efeito colateral (chamadas externas, timers, DOM) → `src/hooks`.
- **Nunca duplique validação ou regra de negócio entre um componente e um hook.** Extraia para `src/lib` e importe dos dois lados. Exemplo real: `src/lib/validation.ts` é a fonte única usada por `src/hooks/useEmailJS.ts` e `src/pages/Contato/index.tsx` — antes essa lógica existia (com pequenas divergências) em três lugares.

## Testes

Todo módulo novo em `src/lib` e todo hook novo ou alterado em `src/hooks` precisa de teste. Fluxo TDD esperado: vermelho (teste que falha) → verde (implementação mínima) → refatorar. Arquivos `*.test.ts(x)` ficam ao lado do código-fonte, não em `__tests__/`.

```bash
npm test            # roda uma vez (CI)
npm run test:watch  # modo watch
npm run test:coverage
```

Guia completo, exemplo comentado e lista do que ainda não tem cobertura: `docs/testing.md`.

## Acessibilidade e performance

Antes de mexer em foco/teclado/animação, veja `ACCESSIBILITY_AUDIT.md`, `UX_PERFORMANCE_AUDIT.md` e `docs/accessibility-updates.md`/`docs/ux-performance-updates.md` — já documentam o porquê de padrões existentes (focus trap do modal, `prefers-reduced-motion`, timing de validação por campo "tocado"). Não duplique esses checklists aqui.

## Anti-padrão conhecido (não copiar)

`EMAILJS_CONFIG` (`src/constants/index.ts`) tem credenciais com fallback hardcoded quando a env var não está definida. É dívida técnica conhecida, fora do escopo dos testes desta leva — não repita o padrão para segredos novos.
