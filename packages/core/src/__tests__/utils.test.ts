import { describe, it, expect } from 'vitest';
import { cn, formatTime, formatNumber, truncate, clamp, percentage } from '../utils';

describe('cn (classname merger)', () => {
  it('merges string classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('filters falsy values', () => {
    expect(cn('foo', null, undefined, false, 'bar')).toBe('foo bar');
  });

  it('handles conditional objects', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active');
  });

  it('handles nested arrays', () => {
    expect(cn('a', ['b', 'c'], 'd')).toBe('a b c d');
  });

  it('handles numbers', () => {
    expect(cn('foo', 0, 1)).toBe('foo 1');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });
});

describe('formatTime', () => {
  it('formats 0ms', () => {
    expect(formatTime(0)).toBe('0s');
  });

  it('formats seconds', () => {
    expect(formatTime(5000)).toBe('5s');
  });

  it('formats minutes', () => {
    expect(formatTime(90000)).toBe('1m 30s');
  });
});

describe('formatNumber', () => {
  it('formats small numbers as-is', () => {
    expect(formatNumber(999)).toBe('999');
  });

  it('formats thousands with K', () => {
    expect(formatNumber(1500)).toBe('1.5K');
  });

  it('formats millions with M', () => {
    expect(formatNumber(2500000)).toBe('2.5M');
  });
});

describe('truncate', () => {
  it('returns short text unchanged', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('truncates long text with ellipsis', () => {
    expect(truncate('hello world this is long', 15)).toBe('hello world ...');
  });

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });
});

describe('clamp', () => {
  it('clamps below min', () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it('clamps above max', () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('returns value within range', () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
});

describe('percentage', () => {
  it('calculates correct percentage', () => {
    expect(percentage(50, 200)).toBe(25);
  });

  it('handles zero total', () => {
    expect(percentage(10, 0)).toBe(0);
  });

  it('handles full value', () => {
    expect(percentage(100, 100)).toBe(100);
  });
});
