
import { Link, useLocation } from "react-router-dom";
import { Sun, Calendar, User, Briefcase, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Sidebar() {
  const location = useLocation();
  
  const categories = [
    { id: "home", name: "Home", icon: Sun, path: "/" },
    { id: "planned", name: "Planned", icon: Calendar, path: "/planned" },
    { id: "personal", name: "Personal", icon: User, path: "/personal" },
    { id: "work", name: "Work", icon: Briefcase, path: "/work" },
    { id: "shopping", name: "Shopping", icon: ShoppingBag, path: "/shopping" }
  ];

  return (
    <aside className="w-64 border-r border-todo-yellow/30 p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-6">
        <Avatar>
          <AvatarImage src="/todo-illustration.svg" alt="Task Manager" />
          <AvatarFallback>TM</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Task Manager</h2>
        </div>
      </div>
      
      <nav className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className={cn(
              "task-card group",
              location.pathname === category.path ? "ring-2 ring-todo-green" : ""
            )}
          >
            <div className={cn(
              "icon-container",
              category.id === "today" && "bg-yellow-100",
              category.id === "planned" && "bg-blue-100",
              category.id === "personal" && "bg-orange-100",
              category.id === "work" && "bg-purple-100",
              category.id === "shopping" && "bg-emerald-100",
            )}>
              <category.icon 
                className={cn(
                  "h-5 w-5",
                  category.id === "today" && "text-yellow-500",
                  category.id === "planned" && "text-blue-500",
                  category.id === "personal" && "text-orange-500",
                  category.id === "work" && "text-purple-500",
                  category.id === "shopping" && "text-emerald-500",
                )} 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
