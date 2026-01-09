import { useState } from 'react';
import { EMAILJS_CONFIG } from '@/constants';

export interface ContactFormData {
  nome: string;
  email: string;
  mensagem: string;
}

export interface UseEmailJSReturn {
  sendEmail: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

export const useEmailJS = (): UseEmailJSReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (data: ContactFormData): Promise<void> => {
    // Validação dos campos
    if (!data.nome || !data.email || !data.mensagem) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const emailjs = await import('@emailjs/browser');

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        data as unknown as Record<string, unknown>,
        {
          publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setError('Erro ao enviar email. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro ao enviar email:', err);
      setError('Erro ao enviar email. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    sendEmail,
    isLoading,
    isSuccess,
    error,
    reset,
  };
};
