/* eslint-disable no-unused-vars */

import React from "react";
import { Typography , Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userEmail } from "../store/selector/userEmail";
import { isUserLoading } from "../store/selector/isUserLoading";



function Landing() {
    const useremail = useRecoilValue(userEmail)
    const userLoading = useRecoilValue(isUserLoading);

    if(userLoading){
      return (
        <>Loading...</>
      )
    }
                     
  if(useremail){
    return (
        <div  style={{display: "flex" , justifyContent:"space-between" , margin:80 }}>
        <div style={{letterSpacing: 0.2, marginTop: 150, paddingLeft:150}}>
        <Typography variant="h1">Admin <br />Dashboard</Typography>
        <Button style={{width: 200 , height: 50 , }} onClick={() => {window.location.href = 'CreateProduct'}} size="large" variant="contained">Create Product</Button>
        
        </div>
        </div>
    )
  }else{
    return <div  style={{display: "flex" , justifyContent:"space-between"  }}>
        <div style={{letterSpacing: 0.2, marginTop: 100,paddingLeft:150}}>
           <br /> 
        <Button style = {{marginRight : 10}} onClick={() => {window.location.href = 'Register'}} size="large" variant="contained">Start Teaching</Button>
        </div>
        </div>
    }
  }
export default Landing;