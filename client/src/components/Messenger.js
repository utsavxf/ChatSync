import React, { useContext } from 'react'
import LoginDialog from './account/LoginDialog'
import { AppBar, Toolbar, styled, Box } from '@mui/material'

import { AccountContext } from '../context/AccountProvider';
import ChatDialog from './chat/ChatDialog';




//overriding the material ui css for appbar component
const LoginHeader = styled(AppBar)`    
background-image: linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% );
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
background-image: linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% );
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
