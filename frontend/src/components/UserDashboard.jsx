import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import { motion } from 'framer-motion';

export default function UserDashboard({ userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchDetails = () => {
    axios.get(`http://localhost:5000/api/user/${userId}`).then(res => setUserDetails(res.data));
    axios.get(`http://localhost:5000/api/transactions/${userId}`).then(res => setTransactions(res.data));
  };

  useEffect(() => {
    fetchDetails();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {userDetails && (
        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-indigo-800">Account Balance</h3>
          <p className="text-2xl text-green-700 font-bold">₹{userDetails.balance}</p>
        </div>
      )}

      <TransactionForm userId={userId} onComplete={fetchDetails} />

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">🧾 Transaction History</h3>
        <ul className="divide-y divide-purple-200 bg-white rounded-xl shadow overflow-hidden">
          {transactions.map((t, i) => (
            <li key={i} className="p-3 text-sm text-gray-700">
              <span className={`font-bold uppercase ${t.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>{t.type}</span> of ₹{t.amount}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
