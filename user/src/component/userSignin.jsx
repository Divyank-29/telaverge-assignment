import React from "react";
import {Card , Typography , Button , Link} from '@mui/material/';
import TextField from '@mui/material/TextField';



function Signin() {
  
    const [username, setusername] = React.useState("");
    const [password , setpassword] = React.useState("");
    

    const handleSignin = () => {
        fetch(`http://localhost:3000/user/login` , 
        {method : "POST",  headers: {
            "Content-Type": "application/json",} , 
            body : JSON.stringify({ username : username , password :password})}
          ).then((response) => response.json()).then((data) => {
          localStorage.setItem("token" , data.token)
          window.location.href = '/'
          console.log("user added", data)})
        }


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
          
          <Card variant="outlined" style={{ borderRadius: "8px", width: 400, padding: 50 }}>
            <TextField fullWidth={true} label="Username" variant="outlined" style={{ marginBottom: "1rem" }} 
            onChange={(e) => {setusername(e.target.value)}} />
            <TextField fullWidth={true} type="password"  label="Password" variant="outlined" style={{ marginBottom: "1rem" }} 
            onChange={(e) => {setpassword(e.target.value)}}/>
            <Button  onClick={handleSignin}   variant="contained" fullWidth={true} style={{ marginBottom: "1rem" }}>Signin</Button>
            <Typography variant="body2">
              New Here? <Link href="/UserSignup" underline="hover">Signin</Link>
            </Typography>
          </Card>
        </div>
      );
      
    } 
   export default Signin; 