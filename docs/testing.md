# Testes

Runner: [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) + jsdom. Configuração em `vitest.config.mts` e `vitest.setup.ts` (raiz do repo).

## Comandos

| Comando | O que faz |
|---|---|
| `npm test` | Roda a suíte uma vez e sai. Usado no CI. |
| `npm run test:watch` | Modo watch, reroda ao salvar. |
| `npm run test:coverage` | Roda uma vez com relatório de cobertura (`text` + `html` em `coverage/`). |

## Onde ficam os testes

Co-localizados: `src/lib/validation.ts` + `src/lib/validation.test.ts` no mesmo diretório. Não usamos pasta `__tests__/`. Motivo: fica óbvio à primeira vista o que tem teste e o que não tem, e os imports internos do teste ficam curtos (`./validation` em vez de `../../../lib/validation`).

## Fluxo TDD

1. **Vermelho** — escreva o teste primeiro, contra uma implementação que ainda não existe (ou que ainda não faz o que o teste espera). Rode `npm test` e confirme que falha pelo motivo certo.
2. **Verde** — escreva o mínimo de código pra passar.
3. **Refatorar** — limpe a implementação (e os pontos que chamam ela) com o teste como rede de segurança.

### Exemplo real

`src/lib/validation.ts` foi extraído assim: a validação do formulário de contato existia (quase) duplicada em três lugares — `src/hooks/useEmailJS.ts`, e duas vezes dentro de `src/pages/Contato/index.tsx` (uma em `handleSubmit`, outra num `useEffect` de revalidação por campo "tocado"). `src/lib/validation.test.ts` foi escrito contra um `./validation` que ainda não existia (vermelho — falha de import), depois `validation.ts` foi criado pra passar (verde), e só então os três pontos de uso foram refatorados pra importar `validateContactForm`/`isValidEmail` em vez de reimplementar a regra. `src/hooks/useEmailJS.test.ts` veio depois, travando o comportamento já refatorado do hook.

## Mocks relevantes

- **`next/font/google`** — stub global em `vitest.setup.ts`. O pipeline do Vitest não processa esse import como o build da Next faz; sem o stub, qualquer teste que renderize algo que importe `_app.tsx` (direta ou indiretamente) quebraria.
- **`@emailjs/browser`** — mockado por teste com `vi.mock('@emailjs/browser', () => ({ send: sendMock }))`. Funciona mesmo o hook chamando `await import('@emailjs/browser')` dinamicamente — `vi.mock` do Vitest intercepta tanto import estático quanto dinâmico, não precisa de tratamento especial.

## O que já tem cobertura

- `src/lib/validation.ts`
- `src/hooks/useEmailJS.ts`

## O que ainda não tem cobertura

Documentado aqui de propósito, pra não ser esquecido silenciosamente:

- **`src/components/Header/index.tsx`** (menu mobile) — abrir/fechar via `userEvent`, `aria-expanded` alternando, fecha ao clicar num link. Estado simples + RTL, sem pegadinha grande.
- **`src/pages/Portifolio/index.tsx`** (modal + focus trap) — precisa de `vi.useFakeTimers()` pro `setTimeout` de 300ms em `fecharModal`, e mock de `next/router` (o componente é uma página). Testar: abrir move o foco pro modal, Tab/Shift+Tab fica preso entre o primeiro e o último elemento focável, Esc fecha, foco volta pro botão que abriu.
- **`src/components/GaleriaFotos/index.tsx`** (carousel Embla) — construído sobre `embla-carousel-react`. Decidir entre mockar a API do Embla (`CarouselApi`) ou aceitar um teste de integração mais pesado. Testar: dots de paginação, prev/next, `aria-label` por slide, callback de zoom de imagem.
