import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { useState } from "react";
import { TaskHistory } from "./TaskHistory";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  name: string;
  count?: number;
  icon: LucideIcon;
  path: string;
}

export function CategoryCard({ id, name, count, icon: Icon, path }: CategoryCardProps) {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Card className="p-6 relative group cursor-pointer" onClick={() => navigate(path)}>
        <div className={cn(
          "w-12 h-12 rounded-full mb-4 flex items-center justify-center",
          id === "home" && "bg-yellow-100",
          id === "planned" && "bg-blue-100",
          id === "personal" && "bg-orange-100",
          id === "work" && "bg-purple-100",
          id === "shopping" && "bg-emerald-100",
        )}>
          <Icon className={cn(
            "h-5 w-5",
            id === "home" && "text-yellow-500",
            id === "planned" && "text-blue-500",
            id === "personal" && "text-orange-500",
            id === "work" && "text-purple-500",
            id === "shopping" && "text-emerald-500",
          )} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          {count !== undefined && (
            <p className="text-sm text-muted-foreground">{count} tasks</p>
          )}
        </div>
        {user && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setShowHistory(true);
            }}
          >
            <History className="h-4 w-4" />
          </Button>
        )}
      </Card>
      <TaskHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        category={id}
      />
    </>
  );
}
