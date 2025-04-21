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
  archived?: boolean;
  archivedAt?: Timestamp;
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

export async function getUserTasks(userId: string, category: string, includeArchived: boolean = false) {
  try {
    console.log('Getting tasks for user:', userId, 'category:', category, 'includeArchived:', includeArchived);
    const tasksRef = collection(db, 'tasks');
    const conditions = [
      where('userId', '==', userId),
      where('category', '==', category)
    ];
    
    if (!includeArchived) {
      conditions.push(where('archived', '!=', true));
    }

    const q = query(
      tasksRef,
      ...conditions,
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
        completed: Boolean(data.completed),
        category: data.category,
        userId: data.userId,
        createdAt: data.createdAt,
        completedAt: data.completedAt,
        archived: Boolean(data.archived),
        archivedAt: data.archivedAt
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

export async function archiveTask(taskId: string) {
  try {
    console.log('Archiving task:', taskId);
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      archived: true,
      archivedAt: Timestamp.now()
    });
    console.log('Task archived successfully');
  } catch (error) {
    console.error('Error archiving task:', error);
    throw error;
  }
}

export async function toggleTask(taskId: string, completed: boolean) {
  try {
    console.log('Toggling task:', taskId, 'completed:', completed);
    const taskRef = doc(db, 'tasks', taskId);
    const now = Timestamp.now();
    
    await updateDoc(taskRef, {
      completed,
      completedAt: completed ? now : null
    });
    
    console.log('Task toggled successfully');
  } catch (error) {
    console.error('Error toggling task:', error);
    throw error;
  }
}
