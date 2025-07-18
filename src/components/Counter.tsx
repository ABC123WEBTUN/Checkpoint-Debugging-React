import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

function Counter() {
  const [count, setCount] = useState(0);
  const [autoIncrement, setAutoIncrement] = useState(false);

  // BUG 5: Memory leak - interval not cleaned up properly
  useEffect(() => {
    if (autoIncrement) {
      const interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      
      // Missing cleanup function
      // return () => clearInterval(interval);
    }
  }, [autoIncrement]);

  // BUG 6: Stale closure - count value is captured from first render
  const handleDoubleCount = () => {
    setTimeout(() => {
      setCount(count * 2); // Should use functional update
    }, 1000);
  };

  return (
    <div className="text-center space-y-4">
      <div className="text-6xl font-bold text-blue-600">
        {count}
      </div>
      
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCount(prev => prev - 1)}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <Minus className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setCount(0)}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleDoubleCount}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Double Count (after 1s)
        </button>
        
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            id="autoIncrement"
            checked={autoIncrement}
            onChange={(e) => setAutoIncrement(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="autoIncrement" className="text-sm">
            Auto increment every second
          </label>
        </div>
      </div>
    </div>
  );
}

export default Counter;