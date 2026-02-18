import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initialises with default value of 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initialises with provided value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));
    expect(result.current.count).toBe(5);
  });

  it('increments by 1 by default', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }));
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('decrements by 1 by default', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(4);
  });

  it('increments by custom step', () => {
    const { result } = renderHook(() => useCounter({ step: 5 }));
    act(() => result.current.increment());
    expect(result.current.count).toBe(5);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.count).toBe(10);
  });

  it('clamps to max', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 9, max: 10 }));
    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(10);
  });

  it('clamps to min', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 1, min: 0 }));
    act(() => result.current.decrement());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it('sets to an arbitrary value', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.set(42));
    expect(result.current.count).toBe(42);
  });

  it('set clamps to min/max bounds', () => {
    const { result } = renderHook(() => useCounter({ min: 0, max: 100 }));
    act(() => result.current.set(200));
    expect(result.current.count).toBe(100);
    act(() => result.current.set(-50));
    expect(result.current.count).toBe(0);
  });
});
