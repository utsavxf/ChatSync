//username for mongodb-utb4578
//password for mongodb- 3wrTzPfGLq5E0pta

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


    const DB=`mongodb+srv://${USERNAME}:${PASSWORD}@clone-whatsapp.tkapmce.mongodb.net/?retryWrites=true&w=majority`

     mongoose.connect(DB,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=> console.log('Database connected')
    ).catch((err)=>{
        console.log(err);
        
        console.log('An error ocurred');
        
    }) 



