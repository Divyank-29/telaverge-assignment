import React from "react";
import { Typography , Button } from "@mui/material";
import { useEffect} from "react";



function LandingPage() {
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
    return (
        <div  style={{display: "flex" , justifyContent:"space-between"  }}>
        <div style={{letterSpacing: 0.2, marginTop: 100,paddingLeft:150}}>
        <Typography variant="h1"  >Learn without<br />limits</Typography>
        <Typography variant="subtitle1">Start, switch, or advance your career with more than 5,800 courses, 
        <br />Professional Certificates, and degrees from world-class universities
        <br /> and companies.</Typography>
        <br />
        <Button onClick={() => {window.location.href="/courses"}}  size="large" variant="contained">start Learning</Button>
        </div>
        <img  style={{marginTop: 15 , paddingRight:10}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=1&w=459&h=497&q=40" alt="" />
        </div>
    )
  }else{
    
    


    return <div  style={{display: "flex" , justifyContent:"space-between"  }}>
        <div style={{letterSpacing: 0.2, marginTop: 100,paddingLeft:150}}>
        <Typography variant="h1"  >Learn without<br />limits</Typography>
        <Typography variant="subtitle1">Start, switch, or advance your career with more than 5,800 courses, 
        <br />Professional Certificates, and degrees from world-class universities
        <br /> and companies.</Typography>
        <br /> 
        <Button style = {{marginRight : 10}} onClick={() => {window.location.href = 'Register'}} size="large" variant="contained">Start Learning</Button>
        </div>
        <img  style={{marginTop: 15 , paddingRight:10}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=1&w=459&h=497&q=40" alt="" />
        </div>
  } 
  }

export default LandingPage;