import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  // BUG 4: Expensive operation in render without memoization
  const expensiveCalculation = () => {
    console.log('Expensive calculation running for todo:', todo.id);
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result;
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${
      todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      
      <div className="flex-1">
        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <AlertCircle className={`w-4 h-4 ${getPriorityColor(todo.priority)}`} />
          <span className={`text-sm font-medium ${getPriorityColor(todo.priority)}`}>
            {todo.priority}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 p-1 rounded"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* This expensive calculation runs on every render */}
      <div className="hidden">
        {expensiveCalculation()}
      </div>
    </div>
  );
}

export default TodoItem;