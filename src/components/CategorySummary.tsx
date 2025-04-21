import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TaskProgress } from "./TaskProgress";

interface CategorySummaryProps {
  id: string;
  name: string;
  icon: LucideIcon;
  path: string;
  totalTasks: number;
  completedTasks: number;
}

export function CategorySummary({ 
  id, 
  name, 
  icon: Icon, 
  path, 
  totalTasks, 
  completedTasks 
}: CategorySummaryProps) {
  return (
    <Link to={path} className="block">
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            id === "today" && "bg-yellow-100",
            id === "planned" && "bg-blue-100",
            id === "personal" && "bg-orange-100",
            id === "work" && "bg-purple-100",
            id === "shopping" && "bg-emerald-100",
          )}>
            <Icon 
              className={cn(
                "h-5 w-5",
                id === "today" && "text-yellow-500",
                id === "planned" && "text-blue-500",
                id === "personal" && "text-orange-500",
                id === "work" && "text-purple-500",
                id === "shopping" && "text-emerald-500",
              )} 
            />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-xs text-muted-foreground">
              {totalTasks === 0 
                ? "No tasks" 
                : completedTasks === totalTasks 
                  ? "All tasks completed" 
                  : `${completedTasks} of ${totalTasks} completed`
              }
            </p>
          </div>
        </div>
        <TaskProgress 
          total={totalTasks} 
          completed={completedTasks} 
          category={id} 
        />
      </div>
    </Link>
  );
}