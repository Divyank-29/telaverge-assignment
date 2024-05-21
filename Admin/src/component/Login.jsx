/* eslint-disable no-unused-vars */
import React from "react";
import {Card , Typography , Button , Link} from '@mui/material/';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { userState  } from "../store/atoms/user";
import { useSetRecoilState } from "recoil";


function Login () {
    const [email, setEmail] = React.useState("");
    const [password , setpassword] = React.useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);

   
  
    const handleLogin = () => {
      fetch(`http://localhost:3000/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to log in');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem("token", data.token);
        navigate("/");
        setUser({
          userEmail: email,
          isLoading: false
        });
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error.message);
        // Handle error (e.g., show error message to the user)
      });
    }
    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
          <Typography variant="subtitle1" style={{ fontWeight: "bold", marginBottom: "2rem" }}>
            Log in to your AcmeStore account
          </Typography>
          
          <Card variant="outlined" style={{ borderRadius: "8px", width: 400, padding: 50 }}>
            <TextField fullWidth={true} label="E-mail" variant="outlined" style={{ marginBottom: "1rem" }} onChange={(e) => {setEmail(e.target.value)}} />
            <TextField fullWidth={true} label="Password" variant="outlined" style={{ marginBottom: "1rem" }}  type = {"password"} onChange={(e) => {setpassword(e.target.value)}}/>
            <Button onClick={handleLogin} variant="contained" fullWidth={true} style={{ marginBottom: "1rem" }}>Login</Button>
            <Typography variant="body2">
              New here? <Link href="Register" underline="hover">Register</Link>
            </Typography>
          </Card>
        </div>
      );
    }      

export default Login;