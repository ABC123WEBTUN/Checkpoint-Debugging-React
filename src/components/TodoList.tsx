import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false, priority: 'high' },
    { id: 2, text: 'Debug with React DevTools', completed: false, priority: 'medium' },
    { id: 3, text: 'Build awesome apps', completed: true, priority: 'low' },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // BUG 1: Missing dependency in useEffect
  useEffect(() => {
    console.log('Todos updated:', todos.length);
  }, []); // Should include [todos]

  // BUG 2: State mutation instead of immutable update
  const toggleTodo = (id: number) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos[todoIndex].completed = !todos[todoIndex].completed; // Direct mutation
      setTodos(todos); // This won't trigger re-render properly
    }
  };

  const addTodo = (text: string, priority: 'low' | 'medium' | 'high') => {
    const newTodo: Todo = {
      id: Date.now(), // Simple ID generation
      text,
      completed: false,
      priority
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <AddTodo onAddTodo={addTodo} />
      
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded text-sm ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded text-sm ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded text-sm ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-2">
        {/* BUG 3: Missing key prop */}
        {filteredTodos.map(todo => (
          <TodoItem
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>

      <div className="text-sm text-gray-600 mt-4">
        Total: {todos.length} | Active: {todos.filter(t => !t.completed).length} | 
        Completed: {todos.filter(t => t.completed).length}
      </div>
    </div>
  );
}

export default TodoList;