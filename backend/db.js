const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12780362',
  password: '6XSDD28WuL',
  database: 'sql12780362',
  port: 3306});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL.');
})

connection.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    account_number VARCHAR(4) UNIQUE,
    balance FLOAT DEFAULT 0
  );
`);

connection.query(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(50),
    amount FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = connection;
