
import TodoItem, { Todo } from './TodoItem';
import { triggerConfetti } from '@/utils/confetti';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const handleDelete = (id: string) => {
    onDelete(id);
    triggerConfetti();
  };

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-white/70 animate-fade-in">
        <p className="text-lg">Your to-do list is empty</p>
        <p className="text-sm mt-2">Add your first task above</p>
      </div>
    );
  }

  return (
    <div className="transition-all duration-300 animate-fade-in">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
