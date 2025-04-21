
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TaskItem } from "@/components/TaskItem";
import { ArrowLeft, History, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTasks } from "@/hooks/useTasks";
import { Confetti } from "@/components/Confetti";
import { TaskInput } from "@/components/TaskInput";
import { TaskProgress } from "@/components/TaskProgress";
import { TaskHistory } from "@/components/TaskHistory";
import { useAuth } from "@/contexts/AuthContext";

const PlannedTasks = () => {
  const isMobile = useIsMobile();
  const { tasks, addTask, removeTask, toggleTask } = useTasks([], "planned");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useAuth();

  const handleRemove = (id: string) => {
    removeTask(id);
    setShowConfetti(true);
  };

  return (
    <AppLayout>
      <Confetti show={showConfetti} onDone={() => setShowConfetti(false)} />
      <div className="yellow-gradient-soft min-h-screen -m-4 md:-m-6 p-4 md:p-6 md:rounded-xl flex flex-col justify-between">
        <div>
          <div className="md:max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              {isMobile && (
                <Link to="/">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Planned</h1>
                  {tasks.length > 0 && (
                    <p className="text-sm text-muted-foreground">{tasks.length} tasks</p>
                  )}
                </div>
              </div>
              
              {user && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowHistory(true)}
                >
                  <History className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm min-h-[210px]">
              {/* Progress Bar */}
              <TaskProgress 
                total={tasks.length} 
                completed={tasks.filter(task => task.completed).length} 
                category="planned" 
                className="mb-4"
              />
              
              <TaskInput onAdd={addTask} placeholder="Add a planned task..." />
              
              {tasks.length === 0 ? (
                <div className="text-todo-gray/70 py-8 text-center text-base">No tasks yet. Add one above!</div>
              ) : (
                tasks.map((task) => (
                  <TaskItem 
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    completed={task.completed}
                    onRemove={handleRemove}
                    onToggle={toggleTask}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <footer className="w-full text-xs text-todo-gray/70 mt-8 text-center select-none">
          made with <span className="inline align-middle" style={{ color: "#fff" }}>🤍</span> by Sajal
        </footer>
      </div>
      <TaskHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        category="planned"
      />
    </AppLayout>
  );
};

export default PlannedTasks;
