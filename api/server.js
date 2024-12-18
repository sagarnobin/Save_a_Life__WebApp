const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

console.log("Attempting to connect to the database...");

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } 
   console.log('Database connected!');
   connection.release(); // Release the connection back to the pool
});


app.use(cors())
app.use(express.json())

app.use('/',require("./router"));


app.listen(4000);

