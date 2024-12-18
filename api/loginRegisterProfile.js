const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors())
app.use(express.json())



const Register=  async (req,res)=>{
    const { name, email, contact, bloodGroup, lastDonate, city, latitude, longitude, password } = req.body;
    console.log('Received data:', { name, email, contact, bloodGroup, lastDonate, city, latitude, longitude, password });
    


    try{
        const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
    'INSERT INTO registration (name, email, contactNo, bloodGroup, lastDonate, city, latitude, longitude, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, contact, bloodGroup, lastDonate, city, latitude, longitude, hashedPassword],
    );
    res.status(201).json({ message: 'User registered successfully!', userId: result.insertId })
    }
    catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
              error: 'Duplicate entry detected. Email or Contact Number already exists.',
            });
          } else {
            // Handle other errors
            res.status(500).json({
              error: 'An unexpected error occurred.',
            });
          }
        console.error('Error saving user:', err);
    }
};

const Login= async (req,res)=>{
    const { email, password } = req.body;

    try{
        const[result] = await db.query(
            'SELECT id, password FROM registration WHERE email = ? ', [email]
        )
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
        const hashedPassword = result[0].password;
        const isPasswordCorrect = await bcrypt.compare(password,hashedPassword);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        else
        {
            const SECRET_KEY = process.env.SECRET_KEY;
            const token = jwt.sign({ userId: result[0].id }, SECRET_KEY, {
                expiresIn: '5d'
            });
            res.status(200).json({ message: 'Login successful', token});

        }
      
    }
    catch(err){
        console.error(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
    
    

};

const Profile= async (req, res) => {
    try {
        const [result] = await db.query(
            'SELECT id, name, email, contactNo, bloodGroup, city, lastDonationDate FROM registration WHERE id = ?',
            [req.user.userId]
        );

        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { Register, Login , Profile};