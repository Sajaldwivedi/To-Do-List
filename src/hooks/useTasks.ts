
import { useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  completed?: boolean;
}

export function useTasks(initialTasks: Task[] = [], category: string = "today") {
  // Load tasks from localStorage on initial render
  const loadTasks = (): Task[] => {
    const savedTasks = localStorage.getItem(`tasks-${category}`);
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  };

  const [tasks, setTasks] = useState<Task[]>(loadTasks());

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`tasks-${category}`, JSON.stringify(tasks));
  }, [tasks, category]);

  const addTask = (title: string) => {
    setTasks(tasks => [
      ...tasks,
      {
        id: "task-" + Math.random().toString(36).slice(2, 9),
        title,
        completed: false,
      },
    ]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks => tasks.filter(t => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return { tasks, addTask, removeTask, toggleTask, setTasks };

}
