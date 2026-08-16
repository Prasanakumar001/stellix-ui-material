import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { TaskItem, TaskStatus } from '../types';

export interface UseTaskProgressReturn {
  tasks: TaskItem[];
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  addTask: (task: TaskItem) => void;
  removeTask: (id: string) => void;
  getByStatus: (status: TaskStatus) => TaskItem[];
  runningCount: number;
  completedCount: number;
  failedCount: number;
  totalCount: number;
  progressPercent: number;
}

export function useTaskProgress(initialTasks: TaskItem[] = []): UseTaskProgressReturn {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const tasksRef = useRef(tasks);
  tasksRef.current = tasks;

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const updateTask = useCallback((id: string, updates: Partial<TaskItem>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const addTask = useCallback((task: TaskItem) => {
    setTasks((prev) => {
      if (prev.some((t) => t.id === task.id)) return prev;
      return [...prev, task];
    });
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getByStatus = useCallback(
    (status: TaskStatus) => tasksRef.current.filter((t) => t.status === status),
    [],
  );

  const counts = useMemo(() => {
    const running = tasks.filter((t) => t.status === 'running').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const failed = tasks.filter((t) => t.status === 'failed').length;
    const total = tasks.length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { running, completed, failed, total, progressPercent };
  }, [tasks]);

  return {
    tasks,
    updateTask,
    addTask,
    removeTask,
    getByStatus,
    runningCount: counts.running,
    completedCount: counts.completed,
    failedCount: counts.failed,
    totalCount: counts.total,
    progressPercent: counts.progressPercent,
  };
}
