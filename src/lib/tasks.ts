import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';

export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  category: string;
  userId: string;
  createdAt: Date;
  completedAt?: Date;
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
      createdAt: data.createdAt.toDate(),
      completedAt: data.completedAt?.toDate(),
    });
  });

  return tasks;
}
