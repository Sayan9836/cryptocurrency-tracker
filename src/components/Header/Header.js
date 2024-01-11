import { Typography } from '@mui/material'
import React from 'react'
import Navbar from '../navbar/Navbar'
import { Carousal } from './Carousal'
import './Header.css'
const Header = () => {

  return (
    <>
    <Navbar/>
    <div className='header'>
      <Typography variant='h2' fontWeight={700} sx={{marginTop:'4rem',letterSpacing:'0.2ch'}}  gutterBottom>Crypto Hunter</Typography>
      <Typography variant='h7'>Get All The Info Regarding Your Favorite Crypto Currency</Typography>
      <Carousal/>                
    </div> 
    </>                      
  )


}

export default Header
