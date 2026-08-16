import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTaskProgress } from '../hooks/useTaskProgress';
import type { TaskItem } from '../types';

const initialTasks: TaskItem[] = [
  { id: '1', title: 'Task A', status: 'completed' },
  { id: '2', title: 'Task B', status: 'running' },
  { id: '3', title: 'Task C', status: 'queued' },
];

describe('useTaskProgress', () => {
  it('initializes with given tasks', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));
    expect(result.current.tasks).toHaveLength(3);
    expect(result.current.totalCount).toBe(3);
  });

  it('counts by status correctly', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));
    expect(result.current.completedCount).toBe(1);
    expect(result.current.runningCount).toBe(1);
    expect(result.current.failedCount).toBe(0);
  });

  it('calculates progress percent', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));
    expect(result.current.progressPercent).toBe(33); // 1/3 ≈ 33%
  });

  it('updates a task', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));

    act(() => result.current.updateTask('2', { status: 'completed' }));

    expect(result.current.completedCount).toBe(2);
    expect(result.current.runningCount).toBe(0);
    expect(result.current.progressPercent).toBe(67);
  });

  it('adds a new task', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));

    act(() => result.current.addTask({ id: '4', title: 'Task D', status: 'queued' }));

    expect(result.current.totalCount).toBe(4);
  });

  it('prevents duplicate task addition', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));

    act(() => result.current.addTask({ id: '1', title: 'Duplicate', status: 'running' }));

    expect(result.current.totalCount).toBe(3);
  });

  it('removes a task', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));

    act(() => result.current.removeTask('2'));

    expect(result.current.totalCount).toBe(2);
    expect(result.current.runningCount).toBe(0);
  });

  it('getByStatus returns correct tasks', () => {
    const { result } = renderHook(() => useTaskProgress(initialTasks));

    const running = result.current.getByStatus('running');
    expect(running).toHaveLength(1);
    expect(running[0].id).toBe('2');
  });

  it('handles empty initial tasks', () => {
    const { result } = renderHook(() => useTaskProgress([]));
    expect(result.current.totalCount).toBe(0);
    expect(result.current.progressPercent).toBe(0);
  });
});
