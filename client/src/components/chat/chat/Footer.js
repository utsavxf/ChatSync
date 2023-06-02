import React, { useEffect, useState } from 'react'

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import { uploadFile } from '../../../service/api';

//CSS

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg)
`;



const Footer = ({sendText,setValue,value,file,setFile,setImage}) => {


     useEffect(()=>{
      
         const getImage=async()=>{
             if(file){ 
                //file cannnot be uploaded directly to mongodb,we have to break it in chunks
                const data=new FormData();
                data.append("name",file.name)  
                data.append("file",file)


                 let response= await uploadFile(data);
                 setImage(response.data);


             }
         }

         getImage();

     },[file])



    const onFileChange=(e)=>{
          console.log(e);
        setFile(e.target.files[0]);  //console me dekha event object me
        setValue(e.target.files[0].name)  //file name input tag me aajayega
          
    }


    return (
        <Container>
            <EmojiEmotions />
            <label htmlFor="fileInput">  
                <ClipIcon style={{cursor:"pointer"}}  />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{display:"none"}}
                onChange={(e)=>onFileChange(e)}  //file ke select hone par trigger hoga
            />

            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}   //humne ye function hi le liya hai props me
                    value={value}
                />
            </Search>
            <Mic />
        </Container>
    )
}

export default Footer
