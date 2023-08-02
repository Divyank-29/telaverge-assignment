/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import {Card , Typography ,  Button , CardMedia , CardContent} from '@mui/material';

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/admin/courses` , {method : "GET" , headers: {
             
            "authorization": "Bearer " + localStorage.getItem("token")}}
            ).then(response => response.json()).then(data => {
                setCourses(data)
                console.log(data)
            })
            } ,
        []);


    return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 350px)", gap: "20px", justifyContent: "center"  , marginTop:80}}>
    
    {courses.map(course => {
        return <Course key={course._id}  course = {course} />
    })}
      </div> 
    
}

function Course (props){
   let course = props.course
  return(
      <div >
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
             <Button style={{marginRight: 20 , marginTop:10}}  variant="contained" onClick={() => {window.location.href = '/course/' + course._id}}>Edit</Button>
             </div>
             </div></div>
     </Card>
     </div>)
 }
   
    



export default ShowCourses;