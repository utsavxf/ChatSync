import axios from 'axios';

const url='http://localhost:8000'  //backend ka url,jaha par server chal raha hoga

export const addUser=async(data)=>{
try {
    
  await axios.post(`${url}/add`,data);



} catch (error) {
    console.log('Error while addUser api',error.message);
     
}

}


export const getUsers=async()=>{
    try {
        let response=await axios.get(`${url}/users`)

             console.log(response.data);
             
         return response.data;

    } catch (error) {
        console.log('Error while calling getUsers api',error.message);
        console.log(error);
        
        
    }
}

export const setConversation=async(data)=>{
    try {
        
        await axios.post(`${url}/conversation/add`,data)
    } catch (error) {
        console.log('Error while calling setConversation api',error.message);
        
    }
}
export const getConversation=async(data)=>{
    try {
        let response=await axios.post(`${url}/conversation/get`,data)
        return response.data
    } catch (error) {
        console.log('Error while calling getConversation api',error.message);
        
    }
}

export const newMessage=async(data)=>{
    try {
        
      await axios.post(`${url}/message/add`,data)

    } catch (error) {
        console.log('Error while calling newMessage api');
        
    }
}


export const getMessages=async(id)=>{
    try {
        let response=await axios.get(`${url}/message/get/${id}`);    
        return response.data;    


    } catch (error) {
        console.log('Error while calling getMessage api');
        
    }
    
}

export const uploadFile=async(data)=>{
     try {
        
         return await axios.post(`${url}/file/upload`,data)  

     } catch (error) {
         console.log('Error while uploading file'+error);
         
     }
}
