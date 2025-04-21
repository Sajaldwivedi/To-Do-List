import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { getUserTasks } from "@/lib/tasks";
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
  archived?: boolean;
  archivedAt?: Date;
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
        // Get all tasks including archived ones for history
        const tasks = await getUserTasks(user.uid, category, true);

        const historyTasks = tasks.map(task => ({
          id: task.id,
          title: task.title,
          completed: Boolean(task.completed),
          createdAt: task.createdAt.toDate(),
          completedAt: task.completedAt ? task.completedAt.toDate() : undefined,
          archived: Boolean(task.archived),
          archivedAt: task.archivedAt ? task.archivedAt.toDate() : undefined
        }));

        console.log('Processed tasks:', historyTasks);
        setHistory(historyTasks);
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
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              {history.length === 0 ? 'No tasks found.' : 
                `${history.length} tasks found. ` + 
                `${history.filter(t => t.completed).length} completed, ` + 
                `${history.filter(t => t.archived).length} archived.`
              }
            </p>
            <p>View and manage your tasks in the {category} category.</p>
          </div>
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
                className={`p-4 border rounded-lg ${task.archived ? 'bg-gray-50' : task.completed ? 'bg-green-50' : 'bg-background'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{task.title}</h4>
                  <span className={`text-sm px-2 py-1 rounded-full ${task.archived ? 'bg-gray-100 text-gray-700' : task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {task.archived ? 'Archived' : task.completed ? 'Completed' : 'Pending'}
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
