const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'db',       
  user: 'user',           
  password: '12345678',            
  database: 'blooddonation', 
  port:3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
