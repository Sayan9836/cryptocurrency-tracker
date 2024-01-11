import styled from '@emotion/styled'
import { AppBar, Button, Card, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import { ContextState } from '../../contexts/CryptoContext'
import './Navbar.css'
const Navbar = () => {
  const { currency,setCurrency } = ContextState();

  const Nav = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgb(14, 13, 13)',
    padding: '0.5rem 5rem',
    boxShadow: '2px 5px 5px grey'
  }))

  const NavItems = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '1.5rem'
  }))
  return (
    <Nav>
      <Typography color='#f9ca24' fontWeight={700} variant='h5'>CryptoFinder</Typography>
      <NavItems>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select" 
          value={currency}
          sx={{color:'white',border:'1px solid white',height:'2.5rem'}}
          onChange={(e)=>setCurrency(e.target.value)}
          >
          <MenuItem value={"INR"}>INR</MenuItem>
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
        <Button variant='contained' sx={{ height: '2.5rem', width: '7rem' }}>Login</Button>
      </NavItems>
    </Nav>

  )
}

export default Navbar


