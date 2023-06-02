
// import express from 'express';  //when we are using import statement then in the paackage.json we have to add a key-value pair:  "type":"module"
// import Connection from '../db/conn.js';  //bc json me type:"module" kar diya na isiliye sab kuch function banakar export import karna padh raha hai

//mai bhai require hi karunga

const express = require('express');
const cors = require('cors');
require('./db/conn');
const bodyParser = require('body-parser');

const router = require('./routes/route');

const app=express();
const PORT=8000;

app.use(bodyParser.json({extended:true}))    //here u can also use express.json(),rest you know the diff and the theory
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(router);

app.listen(PORT,()=>console.log(`Server is running succesfully on port ${PORT} `));