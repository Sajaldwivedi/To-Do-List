import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addTask as addTaskToDb, getUserTasks, updateTask, archiveTask, toggleTask as toggleTaskInDb, Task as DbTask } from "@/lib/tasks";
import { Timestamp } from 'firebase/firestore';

export interface Task extends DbTask {}

export function useTasks(initialTasks: Task[] = [], category: string = "today") {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load tasks from Firebase on initial render and when category changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) {
        setTasks([]);
        setLoading(false);
        return;
      }

      // Small delay to ensure auth is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        console.log('Fetching tasks for user:', user.uid, 'category:', category);
        const fetchedTasks = await getUserTasks(user.uid, category);
        console.log('Fetched tasks:', fetchedTasks);
        setTasks(fetchedTasks as Task[]);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchTasks();
  }, [category, user]);

  const addTask = async (title: string) => {
    if (!user) {
      setError('Please sign in to add tasks');
      return;
    }

    const optimisticId = `temp-${Date.now()}`;
    const now = Timestamp.now();

    try {
      // Create optimistic task
      const optimisticTask: Task = {
        id: optimisticId,
        title,
        completed: false,
        category,
        userId: user.uid,
        createdAt: now,
        completedAt: null
      };

      // Update UI immediately
      setTasks(prev => [optimisticTask, ...prev]);
      setError(null);

      // Save to Firebase in background
      console.log('Adding task to Firebase:', title);
      const savedTask = await addTaskToDb({
        title,
        completed: false,
        category,
        userId: user.uid
      });

      console.log('Task saved to Firebase:', savedTask);

      // Replace optimistic task with real one
      setTasks(prev => prev.map(t => 
        t.id === optimisticId ? { ...savedTask, createdAt: now } : t
      ));
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task');
      // Remove optimistic task on error
      setTasks(prev => prev.filter(t => t.id !== optimisticId));
    }
  };

  const removeTask = async (id: string) => {
    if (!user) return;

    try {
      await archiveTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error archiving task:', err);
      setError('Failed to archive task');
    }
  };

  const toggleTask = async (id: string) => {
    if (!user) return;

    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const newCompleted = !task.completed;
      
      // Update local state first
      setTasks(prev =>
        prev.map(t =>
          t.id === id ? { 
            ...t, 
            completed: newCompleted,
            completedAt: newCompleted ? Timestamp.now() : null
          } : t
        )
      );

      // Then update Firestore
      await toggleTaskInDb(id, newCompleted);

      console.log('Task toggled:', { id, completed: newCompleted });
    } catch (err) {
      console.error('Error toggling task:', err);
      setError('Failed to update task');
      // Revert local state on error
      const task = tasks.find(t => t.id === id);
      if (task) {
        setTasks(prev =>
          prev.map(t =>
            t.id === id ? { ...task } : t
          )
        );
      }
    }
  };

  return { tasks, addTask, removeTask, toggleTask, loading, error };

}
