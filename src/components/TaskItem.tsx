
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface TaskItemProps {
  id: string;
  title: string;
  completed?: boolean;
  onRemove?: (id: string) => void;
  onToggle?: (id: string) => void;
}

export function TaskItem({ id, title, completed = false, onRemove, onToggle }: TaskItemProps) {
  const [isCompleted, setIsCompleted] = useState(completed);

  // Sync completed if parent changes it
  if (completed !== isCompleted) setIsCompleted(completed);

  return (
    <div className="flex items-center gap-3 py-2 group animate-fade-in">
      <Checkbox 
        id={id} 
        checked={isCompleted} 
        onCheckedChange={() => { 
          setIsCompleted(!isCompleted);
          onToggle && onToggle(id);
        }}
        className="border-todo-gray-light data-[state=checked]:bg-todo-green data-[state=checked]:border-todo-green"
      />
      <label 
        htmlFor={id}
        className={`${isCompleted ? "line-through text-todo-gray" : "text-foreground"} flex-1`}
      >
        {title}
      </label>
      {onRemove && (
        <button
          aria-label="Remove"
          className="opacity-20 group-hover:opacity-80 transition-opacity p-1 rounded-full text-red-500 hover:bg-red-50 focus:outline-none"
          onClick={() => onRemove(id)}
          tabIndex={0}
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
