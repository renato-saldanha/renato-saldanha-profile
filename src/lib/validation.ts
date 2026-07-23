export interface ContactFormData {
  nome: string;
  email: string;
  mensagem: string;
}

export interface ContactFormErrors {
  nome?: string;
  email?: string;
  mensagem?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.nome.trim()) {
    errors.nome = 'Informe seu nome';
  }

  if (!data.email.trim()) {
    errors.email = 'Informe seu email';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Por favor, insira um email válido';
  }

  if (!data.mensagem.trim()) {
    errors.mensagem = 'Digite uma mensagem';
  }

  return errors;
}
