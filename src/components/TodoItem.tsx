
import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "flex items-center p-3 rounded-xl mb-3 animate-slide-in transition-all duration-300",
        "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20",
        "group hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/10",
        "transform transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "todo-checkbox mr-3 hover:scale-110 transition-all duration-200",
          todo.completed ? "todo-checkbox-checked" : ""
        )}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <Check size={14} className="text-white animate-scale-in" />}
      </div>
      
      <div 
        className={cn(
          "flex-1 text-white transition-all duration-300",
          todo.completed ? "todo-item-completed" : "",
          "text-base sm:text-lg"
        )}
      >
        {todo.text}
      </div>
      
      <button
        className={cn(
          "p-2 rounded-lg transition-all duration-300",
          "opacity-0 group-hover:opacity-100 hover:bg-white/10",
          "hover:scale-110 hover:text-red-400 transform"
        )}
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        <Trash2 size={18} className="text-white/70 hover:text-white" />
      </button>
    </div>
  );
};

export default TodoItem;
