import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  userId: string;
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

export async function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
  try {
    console.log('Adding task with data:', task);
    const tasksRef = collection(db, 'tasks');
    const newTask = {
      ...task,
      createdAt: Timestamp.now(),
      completedAt: null
    };
    
    const docRef = await addDoc(tasksRef, newTask);
    console.log('Task added successfully with ID:', docRef.id);
    return {
      id: docRef.id,
      ...newTask,
    };
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

export async function getUserTasks(userId: string, category: string) {
  try {
    console.log('Getting tasks for user:', userId, 'category:', category);
    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', userId),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    console.log('Query snapshot size:', querySnapshot.size);
    const tasks: Task[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Document data:', data);
      tasks.push({
        id: doc.id,
        title: data.title,
        completed: data.completed,
        category: data.category,
        userId: data.userId,
        createdAt: data.createdAt,
        completedAt: data.completedAt,
      });
    });

    console.log('Returning tasks:', tasks);
    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  try {
    console.log('Updating task:', taskId, 'with updates:', updates);
    const taskRef = doc(db, 'tasks', taskId);
    const updateData: any = { ...updates };
    
    if (updates.completed !== undefined) {
      updateData.completedAt = updates.completed ? Timestamp.now() : null;
    }

    await updateDoc(taskRef, updateData);
    console.log('Task updated successfully');
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(taskId: string) {
  try {
    console.log('Deleting task:', taskId);
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
    console.log('Task deleted successfully');
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

export async function toggleTask(taskId: string, completed: boolean) {
  try {
    console.log('Toggling task:', taskId, 'completed:', completed);
    await updateTask(taskId, {
      completed,
      completedAt: completed ? Timestamp.now() : null
    });
    console.log('Task toggled successfully');
  } catch (error) {
    console.error('Error toggling task:', error);
    throw error;
  }
}
