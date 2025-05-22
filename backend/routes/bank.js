// === backend/routes/bank.js ===
const express = require('express');
const router = express.Router();
const db = require('../db');

function generateAccountNumber() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

router.post('/add-user', (req, res) => {
  const { name } = req.body;
  console.log(name);
  const accountNumber = generateAccountNumber();
  db.query('INSERT INTO users (name, account_number, balance) VALUES (?, ?, 0)', [name, accountNumber], (err) => {
    if (err) return res.status(500).send(err);
    res.send('User created');
  });
});

router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

router.post('/transaction', (req, res) => {
  const { userId, type, amount } = req.body;

  db.query('SELECT balance FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');

    const currentBalance = results[0].balance;

    if (type === 'withdraw' && currentBalance < amount) {
      return res.status(400).send('Insufficient funds');
    }

    const delta = type === 'deposit' ? amount : -amount;

    db.query('UPDATE users SET balance = balance + ? WHERE id = ?', [delta, userId], (err) => {
      if (err) return res.status(500).send(err);
      db.query(
        'INSERT INTO transactions (user_id, type, amount) VALUES (?, ?, ?)',
        [userId, type, amount],
        (err) => {
          if (err) return res.status(500).send(err);
          res.send('Transaction successful');
        }
      );
    });
  });
});


router.get('/transactions/:id', (req, res) => {
  db.query('SELECT * FROM transactions WHERE user_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
