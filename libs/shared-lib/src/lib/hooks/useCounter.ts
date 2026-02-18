import { useState, useCallback } from 'react';

export interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export function useCounter({
  initialValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}): UseCounterReturn {
  const clamp = useCallback(
    (val: number) => Math.min(Math.max(val, min), max),
    [min, max],
  );

  const [count, setCount] = useState<number>(() => clamp(initialValue));

  const increment = useCallback(() => setCount((c) => clamp(c + step)), [clamp, step]);
  const decrement = useCallback(() => setCount((c) => clamp(c - step)), [clamp, step]);
  const reset = useCallback(() => setCount(clamp(initialValue)), [clamp, initialValue]);
  const set = useCallback((value: number) => setCount(clamp(value)), [clamp]);

  return { count, increment, decrement, reset, set };
}
