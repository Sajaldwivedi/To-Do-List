
import { useState, useEffect } from 'react';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { Todo } from '@/components/TodoItem';

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (e) {
        console.error('Error parsing saved todos:', e);
        return [];
      }
    }
    return [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="todo-card p-6 mb-10 shadow-xl animate-scale-in">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              <span className="sparkle mr-1">✨</span> 
              TickTick 
              <span className="sparkle ml-1">✨</span>
            </h1>
            <div className="h-1 w-20 mx-auto my-4 todo-gradient rounded-full"></div>
          </div>

          {/* Add Todo Form */}
          <AddTodo onAdd={addTodo} />

          {/* Todo List */}
          <TodoList 
            todos={todos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        </div>

        {/* Stats section */}
        {todos.length > 0 && (
          <div className="text-center text-white/60 text-sm animate-fade-in">
            <p>
              {todos.filter(t => t.completed).length} completed / {todos.length} total tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

