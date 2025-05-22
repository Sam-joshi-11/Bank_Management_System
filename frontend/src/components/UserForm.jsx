import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function UserForm({ onAdd }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = () => {
    if (!name) return;
    axios.post('http://localhost:5000/api/add-user', { name })
      .then(() => {
        setMessage('✅ User added');
        setName('');
        onAdd();
      })
      .catch(() => setMessage('❌ Error adding user'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-purple-200"
    >
      <h2 className="text-xl font-bold mb-4 text-purple-700">➕ Add New User</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="w-full p-2 rounded border border-purple-300 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={submit}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-semibold"
        >
          Add
        </button>
      </div>
      {message && <p className={`mt-2 text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
    </motion.div>
  );
}