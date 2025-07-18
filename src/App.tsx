import React, { useState } from 'react';
import TodoList from './components/TodoList';
import Counter from './components/Counter';
import UserProfile from './components/UserProfile';

function App() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  });

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">React Debugging Demo</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Toggle Theme ({theme})
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Todo List Section */}
          <div className={`p-6 rounded-lg shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Todo List</h2>
            <TodoList />
          </div>

          {/* Counter Section */}
          <div className={`p-6 rounded-lg shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Counter</h2>
            <Counter />
          </div>

          {/* User Profile Section */}
          <div className={`p-6 rounded-lg shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <UserProfile user={user} onUpdateUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;