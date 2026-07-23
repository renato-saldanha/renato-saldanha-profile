import { describe, it, expect } from 'vitest';
import { isValidEmail, validateContactForm } from './validation';

describe('isValidEmail', () => {
  it('accepts a well-formed email', () => {
    expect(isValidEmail('ana@example.com')).toBe(true);
  });

  it('rejects a string without "@"', () => {
    expect(isValidEmail('ana.example.com')).toBe(false);
  });

  it('rejects a string without a domain', () => {
    expect(isValidEmail('ana@example')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('validateContactForm', () => {
  const valid = { nome: 'Ana', email: 'ana@example.com', mensagem: 'Olá!' };

  it('returns no errors for a fully valid form', () => {
    expect(validateContactForm(valid)).toEqual({});
  });

  it('flags an empty nome', () => {
    expect(validateContactForm({ ...valid, nome: '' }).nome).toBe('Informe seu nome');
  });

  it('flags a whitespace-only nome', () => {
    expect(validateContactForm({ ...valid, nome: '   ' }).nome).toBe('Informe seu nome');
  });

  it('flags an empty email', () => {
    expect(validateContactForm({ ...valid, email: '' }).email).toBe('Informe seu email');
  });

  it('flags a whitespace-only email as "empty", not "invalid format"', () => {
    expect(validateContactForm({ ...valid, email: '   ' }).email).toBe('Informe seu email');
  });

  it('flags a malformed non-empty email', () => {
    expect(validateContactForm({ ...valid, email: 'not-an-email' }).email).toBe(
      'Por favor, insira um email válido'
    );
  });

  it('flags an empty mensagem', () => {
    expect(validateContactForm({ ...valid, mensagem: '' }).mensagem).toBe('Digite uma mensagem');
  });

  it('returns one error per invalid field when several are invalid', () => {
    const errors = validateContactForm({ nome: '', email: '', mensagem: '' });
    expect(Object.keys(errors).sort()).toEqual(['email', 'mensagem', 'nome']);
  });

  it('does not flag valid fields alongside an invalid one', () => {
    expect(validateContactForm({ ...valid, mensagem: '' })).toEqual({
      mensagem: 'Digite uma mensagem',
    });
  });
});
