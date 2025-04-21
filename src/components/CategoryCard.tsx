
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
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
  
  const handleClick = (e: React.MouseEvent) => {
    // Prevent default Link behavior
    e.preventDefault();
    // Navigate programmatically
    navigate(path);
  };

  return (
    <Link 
      to={path} 
      className="task-card relative group" 
      onClick={handleClick}
      onTouchStart={handleClick} // Add touch event handler
    >
      <div className={cn(
        "icon-container",
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
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking the button
      >
        <MoreVertical className="h-5 w-5" />
      </Button>
    </Link>
  );
}
