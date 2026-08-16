import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDictation } from '../hooks/useDictation';

describe('useDictation', () => {
  it('initializes with isListening=false', () => {
    const { result } = renderHook(() => useDictation());
    expect(result.current.isListening).toBe(false);
    expect(result.current.transcript).toBe('');
  });

  it('detects browser support (jsdom has no SpeechRecognition)', () => {
    const { result } = renderHook(() => useDictation());
    expect(result.current.isSupported).toBe(false);
  });

  it('start does nothing when not supported', () => {
    const { result } = renderHook(() => useDictation());
    result.current.start();
    expect(result.current.isListening).toBe(false);
  });

  it('accepts language parameter', () => {
    const { result } = renderHook(() => useDictation('fr-FR'));
    expect(result.current.isSupported).toBe(false);
    // Just ensures no crash with custom lang
  });
});
