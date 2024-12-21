const mysql = require('mysql2');
require('dotenv').config();
const retryInterval = 5000; // Retry every 5 seconds

function connectWithRetry() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed. Retrying in 5 seconds...', err);
      setTimeout(connectWithRetry, retryInterval);
    } else {
      console.log('Database connected successfully!');
      if (connection) connection.release();
    }
  });

  return pool.promise();
}

const pool = connectWithRetry();
module.exports = pool;
