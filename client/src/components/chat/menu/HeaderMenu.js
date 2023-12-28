import React, { useContext, useState } from 'react'


import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, styled } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';

//css
const MenuOption = styled(MenuItem)`
    font-size: 14px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`;

// const Logout = styled(googleLogout)`
//     border: none;
//     box-shadow: none;
// `;



const HeaderMenu = ({setOpenDrawer}) => {
  
    const { theme, setTheme } = useContext(AccountContext)

    const [open,setOpen]=useState(null);


      const handleClose=()=>{
        setOpen(null);
      }

      const handleClick=(e)=>{
        setOpen(e.currentTarget);
      }


    return (
        <>
            <MoreVert style={{cursor:"pointer",color: theme === 'light' ? 'black' : 'white' }}  onClick={handleClick}  />
            <Menu
                anchorEl={open}
                keepMounted //taki humara menu iske just neeche khule varna kahi bhi khul jaaega
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{    //anchor matlab ye morevert ko hi refer kar raha hai,anchorOrigin set karne ka matlab,ye kaha par khule
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{  //pehle right hand side khol raha tha,ab left hand side
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
               <MenuOption onClick={()=>{handleClose();setOpenDrawer(true); }}>Profile</MenuOption> 
               <MenuOption>My account</MenuOption>
               <MenuOption>Logout</MenuOption>
            </Menu>
        </>
    )
}

export default HeaderMenu;