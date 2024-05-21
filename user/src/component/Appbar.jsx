import React, { useEffect } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchComponent from "./searchComponent";

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { Button } from "@mui/material";
 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));







function Appbar() {
  
  const [useremail , setuseremail] = React.useState(null);

  


  useEffect(() => {
    fetch('http://localhost:3000/user/me' , {method : "GET" , headers: {
      "Content-Type": "application/json" ,
      "authorization": "Bearer " + localStorage.getItem("token")}
    }).then(res => res.json()).then((data) => 
        {
          if(data.username){
          setuseremail(data.username);
        }})
  } , [])

  
 
                     
  if(useremail){
    return <nav>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => 
              window.location.href = "/"
            }
          >
            AcmeStore
          </Typography>
          <Box>
         <SearchComponent/>
         </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button style={{color : "inherit"}}   onClick={() => {
               window.location.href = '/product'
               }}>Products</Button>
               </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button style={{color : "inherit"}}   onClick={() => {
               window.location.href = '/cart'
               }}>cart</Button>
               <Box>
               <Button style={{color : "inherit"}} onClick={() => { 
      localStorage.setItem("token", null); 
      window.location.href = '/userSignin'
      }}>
        Logout</Button>
        </Box>
          </Box>
        </Toolbar>
      </AppBar>
     
    </Box>
    </nav>  }else{
   return <nav>
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => 
              window.location.href = "/"
            }
          >
            AcmeStore
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button style={{color : "inherit"}}  onClick={() => {
               window.location.href = '/userSignup'
               }}>Signup</Button>
               <Box/>
               <Box>
      <Button  style={{color : "inherit"}}   onClick={() => {  
      window.location.href = '/userSignin'
      }}>
        Login</Button>
        </Box>
          </Box>
        </Toolbar>
      </AppBar>
     
    </Box>
    </nav>
          
  }  
}






export default Appbar;