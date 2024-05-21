/* eslint-disable no-unused-vars */
import React from "react";
import {Card , Typography , Button , Link} from '@mui/material/';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";


function Register() {
  
    const [email, setemail] = React.useState("");
    const [password , setpassword] = React.useState("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState)
    

    const handleSignup = () => {
        fetch(`http://localhost:3000/admin/signup` , 
        {method : "POST", 
         headers: {
            "Content-Type": "application/json",} , 
            body : JSON.stringify({ username : email ,
              password :password})}
          ).then((response) => response.json()).then((data) => {
          localStorage.setItem("token" , data.token)
          navigate("/")
          setUser({
            userEmail: email, 
            isLoading : false
          })
          console.log("admin added", data)})
        
        }


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold", marginBottom: "2rem" }}>
           SignUp in account
          </Typography>
          <Card variant="outlined" style={{ borderRadius: "8px", width: 400, padding: 50 }}>
            <TextField fullWidth={true} label="Username" variant="outlined" style={{ marginBottom: "1rem" }} 
            onChange={(e) => {setemail(e.target.value)}} />
            <TextField fullWidth={true} type="password"  label="Password" variant="outlined" style={{ marginBottom: "1rem" }} 
            onChange={(e) => {setpassword(e.target.value)}}/>
            <Button  onClick={handleSignup}   variant="contained" fullWidth={true} style={{ marginBottom: "1rem" }}>Signup</Button>
            <Typography variant="body2">
              Already a user? <Link href="Login" underline="hover">Login</Link>
            </Typography>
          </Card>
        </div>
      );
      
    }      

export default Register;