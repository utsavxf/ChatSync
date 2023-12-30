import { Box,styled } from '@mui/material'
import React, { useContext, useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'
import { AccountContext } from '../../../context/AccountProvider'

const Box1 = styled(Box)`
    backgroundColor: #f3f4ec73;
`;


const Menu = () => {

  const [text,setText]=useState("");
  const {theme,setTheme}=useContext(AccountContext)


  return (
    <Box1 className='menu' id={theme}>
        <Header/>
        <Search setText={setText}/>  {/**text ko set kardiya  search bar me ab paas kardenge conversations me */}
      
        <Conversations text={text}/>
    </Box1>
  )
}

export default Menu
