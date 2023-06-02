const multer = require('multer');
const { GridFsStorage } =require( 'multer-gridfs-storage');

const dotenv =require('dotenv') ;

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@clone-whatsapp.tkapmce.mongodb.net/?retryWrites=true&w=majority`,
    options: {useUnifiedTopology:true, useNewUrlParser: true},
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-file-${file.originalname}`;  //because we don't want duplicacy

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
});

module.exports= multer({storage}); 