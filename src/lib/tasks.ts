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
  const tasksRef = collection(db, 'tasks');
  const newTask = {
    ...task,
    createdAt: Timestamp.now(),
  };
  
  const docRef = await addDoc(tasksRef, newTask);
  return {
    id: docRef.id,
    ...newTask,
  };
}

export async function getUserTasks(userId: string, category: string) {
  const tasksRef = collection(db, 'tasks');
  const q = query(
    tasksRef,
    where('userId', '==', userId),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  const tasks: Task[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
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

  return tasks;
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  const taskRef = doc(db, 'tasks', taskId);
  const updateData: any = { ...updates };
  
  if (updates.completed !== undefined) {
    updateData.completedAt = updates.completed ? Timestamp.now() : null;
  }

  await updateDoc(taskRef, updateData);
}

export async function deleteTask(taskId: string) {
  const taskRef = doc(db, 'tasks', taskId);
  await deleteDoc(taskRef);
}

export async function toggleTask(taskId: string, completed: boolean) {
  await updateTask(taskId, {
    completed,
    completedAt: completed ? Timestamp.now() : null
  });
}
