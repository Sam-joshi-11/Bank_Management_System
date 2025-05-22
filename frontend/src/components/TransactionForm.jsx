import React, { useState } from 'react';
import axios from 'axios';

export default function TransactionForm({ userId, onComplete }) {
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const submit = () => {
    if (!amount || isNaN(amount)) return setMessage('❌ Enter valid amount');
    axios.post('http://localhost:5000/api/transaction', {
      userId,
      type,
      amount: parseFloat(amount)
    })
      .then(res => {
        setMessage(res.data);
        setAmount('');
        onComplete();
      })
      .catch(err => {
        if (err.response?.data) setMessage('❌ ' + err.response.data);
      });
  };

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow border border-green-200">
      <h3 className="text-lg font-semibold text-green-700 mb-2">💸 Make a Transaction</h3>
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="p-2 rounded border border-green-300 bg-green-50"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="p-2 rounded border border-green-300 bg-green-50"
        />
        <button
          onClick={submit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          Submit
        </button>
      </div>
      {message && <p className={`mt-2 text-sm ${message.includes('✅') || message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
    </div>
  );
}
