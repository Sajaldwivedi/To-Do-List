import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addTask as addTaskToDb, getUserTasks, updateTask, deleteTask, toggleTask as toggleTaskInDb, Task as DbTask } from "@/lib/tasks";
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

      // Add a small delay to ensure auth is fully initialized
      await new Promise(resolve => setTimeout(resolve, 1000));

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

    try {
      console.log('Adding task for user:', user.uid, 'category:', category);
      const newTask = await addTaskToDb({
        title,
        completed: false,
        category,
        userId: user.uid
      });
      console.log('Added task:', newTask);
      const taskWithTimestamp = {
        ...newTask,
        createdAt: Timestamp.now(),
        completedAt: null
      };
      setTasks(prev => [taskWithTimestamp as Task, ...prev]);
      setError(null);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task');
    }
  };

  const removeTask = async (id: string) => {
    if (!user) return;

    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error removing task:', err);
      setError('Failed to remove task');
    }
  };

  const toggleTask = async (id: string) => {
    if (!user) return;

    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const newCompleted = !task.completed;
      await toggleTaskInDb(id, newCompleted);
      
      setTasks(prev =>
        prev.map(t =>
          t.id === id ? { 
            ...t, 
            completed: newCompleted,
            completedAt: newCompleted ? Timestamp.now() : null
          } : t
        )
      );
    } catch (err) {
      console.error('Error toggling task:', err);
      setError('Failed to update task');
    }
  };

  return { tasks, addTask, removeTask, toggleTask, loading, error };

}
