import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
  return (
    <Card className="p-6 relative cursor-pointer" onClick={() => navigate(path)}>
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
    </Card>
  );
}
