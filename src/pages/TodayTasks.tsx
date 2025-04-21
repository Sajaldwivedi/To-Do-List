import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { UserHeader } from "@/components/UserHeader";
import { Sun, Calendar, User, Briefcase, ShoppingBag, MoreVertical, ArrowLeft, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTasks } from "@/hooks/useTasks";
import { CategorySummary } from "@/components/CategorySummary";
import { TaskProgress } from "@/components/TaskProgress";
import { TaskInput } from "@/components/TaskInput";
import { TaskHistory } from "@/components/TaskHistory";
import { useAuth } from "@/contexts/AuthContext";

const TodayTasks = () => {
  const isMobile = useIsMobile();
  const { tasks: todayTasks, addTask, toggleTask, removeTask } = useTasks([], "today");
  const { tasks: plannedTasks } = useTasks([], "planned");
  const { tasks: personalTasks } = useTasks([], "personal");
  const { tasks: workTasks } = useTasks([], "work");
  const { tasks: shoppingTasks } = useTasks([], "shopping");
  
  const [completedToday, setCompletedToday] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useAuth();

  // Calculate completed tasks for today
  useEffect(() => {
    const completed = todayTasks.filter(task => task.completed).length;
    setCompletedToday(completed);
  }, [todayTasks]);
  
  // Categories with their task counts
  const categories = [
    { 
      id: "planned", 
      name: "Planned", 
      icon: Calendar, 
      path: "/planned",
      totalTasks: plannedTasks.length,
      completedTasks: plannedTasks.filter(task => task.completed).length
    },
    { 
      id: "personal", 
      name: "Personal", 
      icon: User, 
      path: "/personal",
      totalTasks: personalTasks.length,
      completedTasks: personalTasks.filter(task => task.completed).length
    },
    { 
      id: "work", 
      name: "Work", 
      icon: Briefcase, 
      path: "/work",
      totalTasks: workTasks.length,
      completedTasks: workTasks.filter(task => task.completed).length
    },
    { 
      id: "shopping", 
      name: "Shopping", 
      icon: ShoppingBag, 
      path: "/shopping",
      totalTasks: shoppingTasks.length,
      completedTasks: shoppingTasks.filter(task => task.completed).length
    }
  ];

  // Get current date in a nice format
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <AppLayout>
      <div className="yellow-gradient-soft min-h-screen -m-4 md:-m-6 p-4 md:p-6 md:rounded-xl flex flex-col justify-between">
        <div>
          <div className="md:max-w-2xl mx-auto">
            {/* Header with Date Display */}
            <div className="flex items-center justify-between mb-6">
              {isMobile && (
                <Link to="/">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Sun className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Today</h1>
                    {todayTasks.length > 0 && (
                      <p className="text-sm text-muted-foreground">{todayTasks.length} tasks</p>
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
            </div>

            {/* Prominent Date Display */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{getCurrentDate()}</h2>
            </div>
            
            {/* Today's Tasks Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-medium">Today's Tasks</h3>
                  <p className="text-xs text-muted-foreground">
                    {todayTasks.length === 0 
                      ? "No tasks for today" 
                      : completedToday === todayTasks.length 
                        ? "All tasks completed" 
                        : `${completedToday} of ${todayTasks.length} completed`
                    }
                  </p>
                </div>
              </div>
              
              <TaskProgress 
                total={todayTasks.length} 
                completed={completedToday} 
                category="today" 
                className="mb-3"
              />
              
              <TaskInput onAdd={addTask} placeholder="Add a task for today..." />
            </div>
            
            {/* Categories Grid */}
            <h2 className="text-lg font-semibold mb-4">All Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => (
                <CategorySummary
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  path={category.path}
                  totalTasks={category.totalTasks}
                  completedTasks={category.completedTasks}
                />
              ))}
            </div>
          </div>
        </div>
        <TaskHistory
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          category="today"
        />
      </div>
      <footer className="w-full text-xs text-todo-gray/70 mt-8 text-center select-none">
        made with <span className="inline align-middle" style={{ color: "#fff" }}>🤍</span> by Sajal
      </footer>
    </AppLayout>
  );
};

export default TodayTasks;
