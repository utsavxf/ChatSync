const express = require('express');
const router= new express.Router();
const grid=require('gridfs-stream')
const mongoose = require('mongoose');
const upload =require("../utils/upload")
const user=require('../model/User');
const conversation = require('../model/Conversation');
const { Error } = require('mongoose');
const message = require('../model/Message');
const getImage = require('../controller/image_controller');
// const { uploadFile } = require('../controller/image_controller');
// const { default: upload } = require('../utils/upload');
//IS BHAI NE  ROUTES KE ANDAR JO FUNCTION HONGE UNKE LIYE BHI ALAG FOLDER BANAYA HAI CONTROLLERS KE NAAM SE PAR MAI AISA NAHI KAR RAHA HU,HAT CONFUFION HO JAAYEGA,IMPORT,EXPORT



//USER CONTROLLER
router.post('/add',async(req,res)=>{
    // console.log(req.body);

   try {
     
    const exist=await user.findOne({sub:req.body.sub})  //basically user find kar rahe hai,we have used the sub field on purpose as it is unique for every user

    if(exist){
        res.status(201).json({msg:"user already exists"})
        return;
    }
  
    const newUser=new user(req.body) //varna mongodb me daaldo londe ko
    await newUser.save();
     return res.status(201).json(newUser)
 
  

     
   } catch (error) {
      console.log('Error hai madarchod');
      console.log(error);
      
      
   }

    
})


router.get('/users',async(req,res)=>{
    try {

     const users=await user.find();  //as i want to fetch every data
     res.status(201).json(users);
        
    } catch (error) {
        console.log('Error hai pilpile papite ');
        console.log(error);
         return response.status(500).json(error.message)
    }
}) 

// CONVERSATION CONTROLLER

router.post('/conversation/add',async(req,res)=>{
    try {
        
      const senderId=req.body.senderId;
      const receiverId=req.body.receiverId;
      const exist =await conversation.findOne({members:{$all:[receiverId,senderId]}})  //$all checks that ki ek object ke andar saari cheeze match karni chahiye

      if(exist){
        return res.status(200).json('conversation already exists')
      }
   
      const newConversation=new conversation({
        members:[senderId,receiverId]
      })

      
      
      

      await newConversation.save(); 
      return res.status(200).json("conversation saved successfully")


    } catch (error) {
        return res.status(500).json(error.message)
    }
})


router.post('/conversation/get',async(req,res)=>{
    

    try {
      
      const senderId=req.body.senderId;
      const receiverId=req.body.receiverId;
      
      

      let getconversation=  await conversation.findOne({members:{$all:[receiverId,senderId]}})
      return res.status(200).json(getconversation)

    } catch (error) {
      res.status(500).json(error.message)
    }


})



router.post('/message/add',async(req,res)=>{
      try {

         const newMessage=new message(req.body);
         await newMessage.save();
         await conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.text})  //latest message has been updated


         return res.status(200).json("Message has been sent successfully");

      } catch (error) {
         return res.status(500).json(error.message)
      }
})


router.get('/message/get/:id',async(req,res)=>{

  try {
   
     
 const allMessages=await message.find({conversationId:req.params.id})  //In summary, req.params is a property of the req object in Node.js, which contains named parameters in the URL of a web application

 return res.status(200).json(allMessages)

  } catch (error) {
    console.log('I am mad');
    
     return res.status(500).json(error.message)
  }
 

})


const url="http://localhost:8000";

//now as we have sent data in chunks to our backend,we will have to again categorize it,and this has to happen before uploading,so we have created a middleware
router.post('/file/upload',upload.single("file"),async(req,res)=>{
     if(!req.file){
         return res.status(404).json('File not found')
     }

    //ab mongodb par store karane ke baad hum file ka url bhejenge
    const imageUrl=`${url}/file/${req.file.filename}`


    return res.status(200).json(imageUrl);




})


//fetching that pdf/image from mongodb,taaki web me type kare to vo  pdf aajaaye
router.get('/file/:filename',getImage)













module.exports=router;