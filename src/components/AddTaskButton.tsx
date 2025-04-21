
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTaskButtonProps {
  onAdd?: (title: string) => void;
}

export function AddTaskButton({ onAdd }: AddTaskButtonProps) {
  const handleClick = () => {
    if (!onAdd) return;
    const title = window.prompt("Add a task:");
    if (title && title.trim()) {
      onAdd(title.trim());
    }
  };

  return (
    <Button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-todo-green hover:bg-todo-green-dark shadow-md"
      size="icon"
      onClick={onAdd ? handleClick : undefined}
      tabIndex={0}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}
