import React, { useContext } from 'react'
import LoginDialog from './account/LoginDialog'
import { AppBar, Toolbar, styled, Box } from '@mui/material'

import { AccountContext } from '../context/AccountProvider';
import ChatDialog from './chat/ChatDialog';




//overriding the material ui css for appbar component
const LoginHeader = styled(AppBar)`    
background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  height: 220px;
  box-shadow: none;
`;

const Header = styled(AppBar)`    
  background-color: #00A884;
  height: 125px;
  box-shadow: none;
`;


const Component = styled(Box)`
height: 100vh;
background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
`;



const Messenger = () => {


  const { account } = useContext(AccountContext)



  return (
    <>
      <Component>
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
              <LoginHeader>
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
