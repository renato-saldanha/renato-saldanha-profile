import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// next/font/google não passa pelo pipeline de build da Next dentro do Vitest,
// então precisa de um stub global pra qualquer teste que renderize algo que o importe.
vi.mock('next/font/google', () => {
  const mockFont = () => ({
    className: 'mock-font-class',
    variable: '--mock-font-variable',
    style: { fontFamily: 'mock-font' },
  });
  return new Proxy({}, { get: () => mockFont });
});
