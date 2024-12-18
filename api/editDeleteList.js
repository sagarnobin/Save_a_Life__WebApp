const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db');

const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors())
app.use(express.json())

const EditProfile =  async (req,res) => {
    const {id, name, email, contactNo , city} = req.body;
    try{
        const [result] = await db.query(
            "UPDATE registration SET name = ?, email = ?, contactNo = ?, city =? WHERE id = ?",
            [name, email, contactNo, city, id]
        );
        if(result.affectedRows==1){
            console.log({message:"Profile Updated"})
            return res.status(200).json({message:"Profile updated"});
        }
        
    }
    catch(err)
    {
        console.error(err)
    }
    

};

const DeleteProfile = async (req,res)=>{
    const {userId} = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }
    try{
        await db.query('DELETE FROM registration WHERE id = ?', [userId]);
        res.status(200).json({message:'ID deleted successfully'});
    }
    catch(error)
       { console.error(error)
        res.status(400).json({message:'Error with deleting profile'})
       }
};

const List1 =  async (req,res)=>{

    try{
        const{ bloodGroup, quantity, latitude, longitude } =req.body;
        const [result] = await db.query(
            `SELECT name, contactNo, bloodGroup
             FROM registration 
             WHERE bloodGroup = ? AND
              ST_Distance_Sphere(
                point(longitude, latitude), point(?, ?)
            ) <= 5000
             AND DATEDIFF(CURDATE(), lastDonationDate) >= 90
             `,
            [bloodGroup, longitude, latitude ]
        );
        res.status(200).json(result);
        console.log(result);
             
    }
    catch(err){
        console.error(err);
    }
};

const List2 = async (req,res)=>{
    const{userId, bloodGroup, latitude, longitude} = req.body;
   try{
    const [result] = await db.query(
        `SELECT name, contactNo, latitude, longitude 
            FROM donationcenter 
            WHERE ST_Distance_Sphere(
                point(longitude, latitude), point(?, ?)
            ) <= 5000`, [longitude, latitude]
    );
    return res.status(200).json(result);

   }catch(err){
    console.error(err)
   }
};



module.exports= {EditProfile, DeleteProfile , List1, List2};