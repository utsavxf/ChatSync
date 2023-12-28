import React, { useContext } from 'react'
import LoginDialog from './account/LoginDialog'
import { AppBar, Toolbar, styled, Box } from '@mui/material'

import { AccountContext } from '../context/AccountProvider';
import ChatDialog from './chat/ChatDialog';
import './Messenger.css'




//overriding the material ui css for appbar component
const LoginHeader = styled(AppBar)`    
background-color: #ededed;
  height: 220px;
  box-shadow: none;
`;

const Header = styled(AppBar)`    
  background-color: #ededed;
  height: 125px;
  box-shadow: none;
`;


const Component = styled(Box)`
height: 100vh;
`;



const Messenger = () => {


  const { account,theme,setTheme } = useContext(AccountContext)



  return (
    <>
      <Component className='maincomponent' id={theme} >
        {
          account ?
            <>
               <ChatDialog/>
              {/* <Header>
                <Toolbar></Toolbar>
              </Header>
              <div>hat chutiye</div> */}
            </> :
            <>
              <LoginHeader className='lh' id='theme'>
                <Toolbar></Toolbar>
              </LoginHeader>
              <LoginDialog />
            </>
        }

      </Component>

    </>
  )
}

export default Messenger;
