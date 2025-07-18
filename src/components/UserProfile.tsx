import React, { useState } from 'react';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';

interface User {
  name: string;
  email: string;
  age: number;
}

interface UserProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

function UserProfile({ user, onUpdateUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  // BUG 7: Not updating editForm when user prop changes
  // useEffect(() => {
  //   setEditForm(user);
  // }, [user]);

  const handleSave = () => {
    onUpdateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({...editForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={editForm.age}
              onChange={(e) => setEditForm({...editForm, age: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-blue-500" />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">Name</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <div>
            <div className="font-medium">{user.email}</div>
            <div className="text-sm text-gray-500">Email</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-blue-500" />
          <div>
            <div className="font-medium">{user.age} years old</div>
            <div className="text-sm text-gray-500">Age</div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Edit2 className="w-4 h-4" />
        Edit Profile
      </button>
    </div>
  );
}

export default UserProfile;