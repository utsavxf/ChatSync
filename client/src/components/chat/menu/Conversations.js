import React, { useContext, useEffect, useState } from 'react'

import { getUsers } from '../../../service/api'
import { AccountContext } from '../../../context/AccountProvider';

import { Box,styled,Divider } from '@mui/material';
import Conversation from './Conversation';

//if data bahar nikle to scroll bar
const Component = styled(Box)` 
    overflow: overlay;
    height: 81vh;
    backgroundColor: #f3f4ec73;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #d2e095;
    opacity: .6;
`;
 

const Conversations = ({text}) => {


      const [users,setUsers]=useState([]);

      const {account,theme,socket,setActiveUsers}=useContext(AccountContext)


    //component ke call hote hi hume data ko get karna hai
    useEffect(()=>{
         const fetchData=async ()=>{
             let data=await getUsers();
            //  console.log(data);
             
             const filteredData=data.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()))
             setUsers(filteredData)

             
         }
         fetchData(); 
    },[text])
 

    // socket.io 
    useEffect(() => {
      socket.current.emit('addUser', account);
      socket.current.on("getUsers", users => {
        setActiveUsers(users);
      });
    }, [account]);



  return (
    <Component  id={theme} className='ctc'>
      {
      users.map(user => (
        user.sub!==account.sub &&  ///jo user login hai,usi ki details thodi dikhani hai
        <> 
        <Conversation user={user}/> {/*as a prop pass kara diya hai user ka saara data*/}
        <StyledDivider />
        </>
      ))
      }

          </Component>
  )
}

export default Conversations
