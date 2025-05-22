import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserDashboard from './components/UserDashboard';
import axios from 'axios';
import { motion } from 'framer-motion';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-blue-100 to-green-100 text-gray-800 font-sans">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-6 shadow-xl">
        <motion.h1
          className="text-4xl text-center font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🏦 Bank Management System
        </motion.h1>
      </header>

      <main className="container mx-auto px-4 py-10">
        <UserForm onAdd={fetchUsers} />

        <div className="bg-white rounded-xl shadow-lg p-6 mt-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-700 mb-4">🔍 Select Your Account</h2>
          <select
            className="p-2 rounded border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="" disabled>Select user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name} - {user.account_number}</option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div className="mt-6">
            <UserDashboard userId={selectedUser} />
          </div>
        )}
      </main>

      <footer className="text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Smart Bank UI · Crafted with ❤️
      </footer>
    </div>
  );
}

export default App;