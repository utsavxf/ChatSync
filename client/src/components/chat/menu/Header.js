import React, { useContext, useState } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import { Box,styled } from '@mui/material';
import { Chat as MessageIcon, } from '@mui/icons-material';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/InfoDrawer';

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 22px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;
    
const Image = styled('img') ({
    height:40,
    width:40,
    borderRadius: '50%'
})

const Header = () => {

    const {account}=useContext(AccountContext);

    const [openDrawer,setOpenDrawer]=useState(false);

    const toggleDrawer=()=>{
        setOpenDrawer(true);
    }

  return (
    <>
    <Component>
        {/* ye picture us decoded object se hi aa rahi hai(account),google provide karta hai */}
       <Image src={account.picture} alt="dp" onClick={()=>toggleDrawer()} /> 
       <Wrapper>
                 <MessageIcon />
                <HeaderMenu setOpenDrawer={setOpenDrawer}/>
                </Wrapper>
    </Component>
    <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/> 
    {/* passing the state as a prop kyuki jo code likhna hai vo infoDrawer me hi likhna hai */}
    </>
  )
}
export default Header
