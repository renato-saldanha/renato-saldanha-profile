import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useEmailJS } from './useEmailJS';
import { EMAILJS_CONFIG } from '@/constants';

const sendMock = vi.fn();
vi.mock('@emailjs/browser', () => ({ send: sendMock }));

const validData = { nome: 'Ana', email: 'ana@example.com', mensagem: 'Olá!' };

describe('useEmailJS', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('starts in an idle state', () => {
    const { result } = renderHook(() => useEmailJS());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('does not call emailjs.send when the form is invalid', async () => {
    const { result } = renderHook(() => useEmailJS());

    await act(async () => {
      await result.current.sendEmail({ ...validData, nome: '' });
    });

    expect(sendMock).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Informe seu nome');
  });

  it('sends with the configured EmailJS credentials on success', async () => {
    sendMock.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const { result } = renderHook(() => useEmailJS());

    await act(async () => {
      await result.current.sendEmail(validData);
    });

    expect(sendMock).toHaveBeenCalledWith(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      validData,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('sets isLoading while the request is in flight', async () => {
    let resolveSend: (value: { status: number; text: string }) => void;
    sendMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveSend = resolve;
      })
    );
    const { result } = renderHook(() => useEmailJS());

    act(() => {
      result.current.sendEmail(validData);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));

    await act(async () => {
      resolveSend({ status: 200, text: 'OK' });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('sets a generic error when EmailJS returns a non-200 status', async () => {
    sendMock.mockResolvedValueOnce({ status: 400, text: 'Bad Request' });
    const { result } = renderHook(() => useEmailJS());

    await act(async () => {
      await result.current.sendEmail(validData);
    });

    expect(result.current.error).toBe('Erro ao enviar email. Tente novamente.');
    expect(result.current.isSuccess).toBe(false);
  });

  it('sets a retry-later error when emailjs.send throws', async () => {
    sendMock.mockRejectedValueOnce(new Error('network down'));
    const { result } = renderHook(() => useEmailJS());

    await act(async () => {
      await result.current.sendEmail(validData);
    });

    expect(result.current.error).toBe('Erro ao enviar email. Tente novamente mais tarde.');
  });

  it('resets back to the idle state', async () => {
    sendMock.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const { result } = renderHook(() => useEmailJS());

    await act(async () => {
      await result.current.sendEmail(validData);
    });
    expect(result.current.isSuccess).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
