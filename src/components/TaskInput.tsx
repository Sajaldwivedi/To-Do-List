import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (title: string) => void;
  placeholder?: string;
}

export function TaskInput({ onAdd, placeholder = "Add a new task..." }: TaskInputProps) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAdd(taskTitle.trim());
      setTaskTitle("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button 
        onClick={handleAddTask}
        size="icon"
        className="bg-todo-green hover:bg-todo-green-dark"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}