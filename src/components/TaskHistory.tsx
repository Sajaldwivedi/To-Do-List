import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskHistory {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export function TaskHistory({ isOpen, onClose, category }: { 
  isOpen: boolean; 
  onClose: () => void;
  category: string;
}) {
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      try {
        console.log('Fetching history for user:', user.uid, 'category:', category);
        const tasksRef = collection(db, 'tasks');
        const q = query(
          tasksRef,
          where('userId', '==', user.uid),
          where('category', '==', category),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const tasks: TaskHistory[] = [];
        console.log('Found tasks:', querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Task data:', data);
          tasks.push({
            id: doc.id,
            title: data.title,
            completed: data.completed,
            createdAt: data.createdAt.toDate(),
            completedAt: data.completedAt?.toDate(),
          });
        });

        console.log('Processed tasks:', tasks);
        setHistory(tasks);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (isOpen) {
      fetchHistory();
    }
  }, [user, category, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Task History - {category}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            View all your tasks and their completion status in the {category} category.
          </p>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tasks found in this category.
              </div>
            ) : history.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg ${task.completed ? 'bg-green-50' : 'bg-background'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{task.title}</h4>
                  <span className={`text-sm px-2 py-1 rounded-full ${task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    <span>Created:</span>
                    <span>{task.createdAt.toLocaleString()}</span>
                  </p>
                  {task.completedAt && (
                    <p className="text-sm text-muted-foreground flex justify-between">
                      <span>Completed:</span>
                      <span>{task.completedAt.toLocaleString()}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
