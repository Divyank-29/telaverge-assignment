/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import {Card , Typography , CardMedia , CardContent, Button } from '@mui/material';

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/purchasedCourses` , {method : "GET" , 
        headers: {
            "authorization": "Bearer " + localStorage.getItem("token")}}
            ).then(response => response.json()).then(data => {
                setCourses(data.purchasedCourses)
                console.log(data.purchasedCourses)
            })
            } ,
        []);


    return <div  style={{display: "flex" , flexWrap : "wrap" }} >
    
    {courses.map(course => {
        return <Course key={course._id}  course = {course} />
    })}
      </div> 
    
}

function Course (props){
   let course = props.course
  return(
    <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center" , marginTop:100  , marginLeft:60 }}>
    <Card style={{
      margin:10,
      width: 350,
      minHeight: 200,
      borderRadius: 20,
      marginRight: 50,
      paddingBottom: 15,
      zIndex: 2
  }}>
     <CardMedia
     sx={{height: 180}}
     image={course.imageLink}/>
   <div >
   <CardContent>
   <Typography gutterBottom variant="h5" component="div">
       {course.title}
     </Typography>
     
     <Typography  variant="body2" color="text.secondary">
       {course.description}
     </Typography>
     </CardContent>
     
     <div style={{ marginLeft:15 ,justifyContent:"space-between" , display:"flex"}}>
         <div>
          <Typography variant="subtitle2" style={{color: "gray"}}>
              Price
          </Typography>
          <Typography variant="subtitle1">
              ₹ {course.price} 
          </Typography>
          </div>
          <div>
          <Button style={{marginRight: 20 , marginTop:10}}  variant="contained" >view</Button>
          </div>
          </div>
          </div>
  </Card>
  </div>)
 }
   
    



export default ShowCourses;
