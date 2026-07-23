import { useState } from 'react';
import { EMAILJS_CONFIG } from '@/constants';
import { validateContactForm, type ContactFormData } from '@/lib/validation';

export type { ContactFormData };

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
    const errors = validateContactForm(data);
    const firstError = errors.nome ?? errors.email ?? errors.mensagem;
    if (firstError) {
      setError(firstError);
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
