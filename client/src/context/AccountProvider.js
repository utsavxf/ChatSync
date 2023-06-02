import { createContext, useEffect, useState,useRef } from "react";


import {io} from "socket.io-client";

export const AccountContext =  createContext(null); //ye ek initial value leta hain null


const AccountProvider=({children})=>{   //children likhna is important else the data will not be available to messenger's children and you will see a blank screen


      const[account,setAccount]=useState();
      const[person,setPerson]=useState({});  
      const [activeUsers,setActiveUsers]=useState([]);
      const [newMessageFlag,setNewMessageFlag]=useState([]);

      const socket=useRef(); 


     useEffect(()=>{
      socket.current=io('ws://localhost:9000')
     },[])

    
  return(
    <AccountContext.Provider value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag
    }}>
        {children}

    </AccountContext.Provider>    
  )
 

}

export default AccountProvider