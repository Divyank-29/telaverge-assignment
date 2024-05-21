import React from "react";
import {Card , Typography , Button , Link} from '@mui/material/';
import TextField from '@mui/material/TextField';

function Signup() {
  
  const [username, setusername] = React.useState("");
  const [password , setpassword] = React.useState("");
  
  const handleSignup = () => {
      fetch(`http://localhost:3000/user/signup`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: username, password: password })
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); 
      })
      .then((data) => {
          localStorage.setItem("token", data.token);
          window.location.href = '/';
          console.log("user added", data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "bold", marginBottom: "2rem" }}>
          Signup and start learning
        </Typography>
        <Card variant="outlined" style={{ borderRadius: "8px", width: 400, padding: 50 }}>
          <TextField fullWidth={true} label="Username" variant="outlined" style={{ marginBottom: "1rem" }} 
          onChange={(e) => {setusername(e.target.value)}} />
          <TextField fullWidth={true} type="password"  label="Password" variant="outlined" style={{ marginBottom: "1rem" }} 
          onChange={(e) => {setpassword(e.target.value)}}/>
          <Button  onClick={handleSignup}   variant="contained" fullWidth={true} style={{ marginBottom: "1rem" }}>Signup</Button>
          <Typography variant="body2">
            Already a user? <Link href="userSignin" underline="hover">Login</Link>
          </Typography>
        </Card>
      </div>
  );
} 

export default Signup;
