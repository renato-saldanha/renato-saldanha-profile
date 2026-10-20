import { describe, it, expect } from 'vitest';
import { deveCarregarImagem } from './gallery';

describe('deveCarregarImagem', () => {
  it('carrega a imagem do slide atual', () => {
    expect(deveCarregarImagem(2, 2, 6, true)).toBe(true);
  });

  it('adia slides distantes do atual', () => {
    expect(deveCarregarImagem(4, 1, 8, true)).toBe(false);
  });

  // Decisões em aberto — ver TODO em gallery.ts
  it.todo('pré-carrega o próximo slide');
  it.todo('pré-carrega o slide anterior');
  it.todo('com loop, trata o último slide como vizinho do primeiro (e vice-versa)');
  it.todo('sem loop, não dá a volta nas pontas');
});
