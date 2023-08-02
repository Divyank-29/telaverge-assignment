import React, { useEffect } from "react";
import { Typography , Button , AppBar, Toolbar } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default Appbar;


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
    return <div >
   <AppBar >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
       <div style={{display: "flex" , justifyContent: "flex-start"}} >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
          >
            <MenuIcon />
          </IconButton>
      <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
             marginTop:1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Coursera
          </Typography>
          </div>
          <div>
            <Button  color="inherit" onClick={() => {
               window.location.href = '/Boughtcourse'
               }}>My Courses</Button>
      <Button color="inherit" onClick={() => { 
      localStorage.setItem("token", null); 
      window.location.href = '/userSignin'
      }}>
        Logout</Button>
    </div>
    
    </Toolbar>
    </AppBar>
  </div>
  }else{
   return <div >
    <AppBar >
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{display:"flex" , justifyContent:"flex-start" }}>
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" > <MenuIcon /> </IconButton>
    <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              marginTop: 1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              
              color: 'inherit',
              textDecoration: 'none',
            }}> Coursera </Typography>
          </div>
          <div > 
          <Button onClick={() => window.location.href = '/userSignup'}  color="inherit">Signup</Button>
          <Button onClick={() => window.location.href = '/userSignin'} color="inherit">Login</Button>
          </div>
          </Toolbar>
          </AppBar>
  </div>
  }  
}