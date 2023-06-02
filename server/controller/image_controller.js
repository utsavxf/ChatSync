const grid =require("gridfs-stream");
const mongoose = require('mongoose');

const url="http://localhost:8000"

//hume ek baar mongodb se connection open karna padega

let gfs, GridFSBucket;
const conn=mongoose.connection;

 conn.once('open',()=>{
   GridFSBucket= new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    });

    gfs=grid(conn.db,mongoose.mongo)
    gfs.collection('fs')
 })

  const getImage=async(request,response)=>{
    try {

        //yaha par mujhe vo file nikalni hai
        const file=await gfs.files.findOne({filename:request.params.filename})

        const readStream=GridFSBucket.openDownloadStream(file._id)
        readStream.pipe(response);

        
    } catch (error) {
        return response.status(500).json(error.message);
    }
 }

 module.exports=getImage;

