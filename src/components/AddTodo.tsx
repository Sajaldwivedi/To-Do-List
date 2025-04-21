
import { useState, FormEvent, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex items-center mb-8 transition-all duration-300",
        isFocused ? "scale-[1.02]" : ""
      )}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Add a new task..."
        className="todo-input flex-1 mr-3"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className={cn(
          "todo-gradient p-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center",
          "hover:shadow-todo-primary/30 hover:shadow-xl hover:scale-105 active:scale-95",
          !text.trim() && "opacity-70 cursor-not-allowed hover:scale-100 hover:shadow-none"
        )}
        aria-label="Add task"
      >
        <Plus size={24} className="text-white" />
      </button>
    </form>
  );
};

export default AddTodo;
