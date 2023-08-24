import { Box,styled } from '@mui/material'
import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Conversations from './Conversations'



const Menu = () => {

  const [text,setText]=useState("");


  return (
    <Box>
        <Header/>
        <Search setText={setText}/>  {/**text ko set kardiya  search bar me ab paas kardenge conversations me */}
        <Conversations text={text}/>
    </Box>
  )
}

export default Menu
