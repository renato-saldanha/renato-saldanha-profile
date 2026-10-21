/**
 * Decide se a imagem do slide `indice` deve ser baixada já (`loading="eager"`)
 * ou só quando ficar visível (`loading="lazy"`).
 *
 * O Embla move os slides com `transform` dentro de um viewport com
 * `overflow: hidden`, então o lazy-loading nativo só dispara quando o slide já
 * está entrando na tela — por isso a imagem "pisca" ao trocar de slide em rede lenta.
 *
 * @param indice posição do slide avaliado (0-based)
 * @param atual  slide selecionado no momento
 * @param total  quantidade de slides
 * @param loop   se o carrossel dá a volta (último → primeiro)
 */
export function deveCarregarImagem(
  indice: number,
  atual: number,
  total: number,
  loop: boolean
): boolean {
  // TODO: decidir quais vizinhos do slide atual pré-carregar (ver `it.todo` em gallery.test.ts).
  return indice === atual;
}
