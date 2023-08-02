/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import { courseState } from "../store/atoms/course";
import { courseImage, coursePrice, courseTitle, isCourseLoading } from "../store/selector/coursestate";
import { useSetRecoilState , useRecoilValue , useRecoilState } from "recoil";
import axios from "axios"


function Course() {
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    

    useEffect(() => {
        fetch(`http://localhost:3000/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            setCourse({isLoading: false, course: data});
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching course:", error);
        });
    } );


    if (courseLoading) {
        return <></>
    }
    
    return<div>
    <GrayTopper />
    <Grid container>
        <Grid item lg={8} md={12} sm={12}>
            <UpdateCard  />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
            <CourseCard />
        </Grid>
    </Grid>
</div>
}



// eslint-disable-next-line react/prop-types
function GrayTopper() {
    const title = useRecoilValue(courseTitle)
    return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

const UpdateCard = (props) =>  {
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const course = props.course
    
    const [title, setTitle] = React.useState(courseDetails.course.title);
    const [description , setdescription] = React.useState(courseDetails.course.description)
    const [imageLink , setimageLink] = React.useState(courseDetails.course.imageLink)
    const [price , setprice] = React.useState(courseDetails.course.price)


    return ( 
        
       <div style={{display : "flex" , justifyContent: "center"  } }>
       <Card variant="outlined" style={{padding : 20 , margin : 200}}> 
       <div style={{display:"flex" , flexDirection: "column" , marginBottom: "1rem"}}>
       <TextField style ={{ marginBottom: "1rem" }}  value = {title} onChange={(e) => {setTitle(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Title" variant="outlined" />
       <TextField style={{ marginBottom: "1rem" }} value={description} onChange={(e) => {setdescription(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Description" variant="outlined" /> 
       <TextField style={{ marginBottom: "1rem" }} value={imageLink} onChange={(e) => {setimageLink(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Image" variant="outlined" />
       <TextField style={{ marginBottom: "1rem" }} value={price} onChange={(e) => {setprice(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Price" variant="outlined" />
       <Button style={{ marginBottom: "1rem" }} onClick={async () => {
                   await  axios.put("http://localhost:3000/admin/courses/" + courseDetails.course._id, {
                        title: title,
                        description: description,
                        imageLink: imageLink,
                        published: true,
                        price
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    let updatedCourse = {
                        _id: courseDetails.course._id,
                        title: title,
                        description: description,
                        imageLink: imageLink,
                        price
                    };
                    setCourse({isLoading: false , course:updatedCourse});
                }} variant="contained" fullWidth={true} >UpdateCourse</Button>
       </div>
       </Card>
       </div>   

        
    )

}



function CourseCard (props){
    const title = useRecoilValue(courseTitle)
    const imageLink = useRecoilValue(courseImage)
    
    const course = props.course
return ( <div style={{display: "flex", flexWrap: "wrap" ,  marginTop: 50, justifyContent: "center", width: "100%"}}>
<Card style={{
   margin: 10,
   width: 350,
   minHeight: 200,
   borderRadius: 20,
   marginRight: 50,
   paddingBottom: 15,
   zIndex: 2
}}>
   <img src={imageLink} style={{width: 350}} ></img>
   <div style={{marginLeft: 10}}>
       <Typography variant="h5">{title}</Typography>
       <Typography variant="subtitle2" style={{color: "gray"}}>
           Price
       </Typography>
       <Price/>
   </div>
</Card>
</div>) 
}

function Price () {
    const price = useRecoilValue(coursePrice)
    return (
    <div>
    
       <Typography variant="subtitle1">
           <b>Rs {price} </b>
       </Typography>
       </div>
    )
}

export default Course;
