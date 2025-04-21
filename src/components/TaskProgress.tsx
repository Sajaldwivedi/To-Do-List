import { cn } from "@/lib/utils";

interface TaskProgressProps {
  total: number;
  completed: number;
  category: string;
  className?: string;
}

export function TaskProgress({ total, completed, category, className }: TaskProgressProps) {
  // Calculate percentage, but only if there are tasks
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Determine color based on category
  const getColorClass = () => {
    switch (category) {
      case "today":
        return "bg-yellow-500";
      case "planned":
        return "bg-blue-500";
      case "personal":
        return "bg-orange-500";
      case "work":
        return "bg-purple-500";
      case "shopping":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{percentage}% Complete</span>
        <span className="text-xs text-muted-foreground">
          {completed}/{total} tasks
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", getColorClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}