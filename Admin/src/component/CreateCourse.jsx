/* eslint-disable no-unused-vars */
import React , {useState} from "react";
import { Typography , TextField , Button  , Card} from "@mui/material";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    // eslint-disable-next-line no-unused-vars
    const [title, setTitle] = React.useState("");
    const [description , setdescription] = React.useState("")
    const [imageLink , setimageLink] = React.useState("")
    const [price , setprice] = React.useState("")

    const handleCreate = () => {
        fetch("http://localhost:3000/admin/courses", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: true
          }),
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + localStorage.getItem("token") 
          }
        })
        .then((res) => {
          if (res.status === 403) {
            throw new Error("Forbidden: Access Denied"); // Handle the 403 Forbidden error
          }
          return res.json(); // Parse the response as JSON
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
      };

    return <div>
       
       <Typography> Create Course </Typography>
       <div style={{display : "flex" , justifyContent: "center" , marginTop:200 } }>
       <Card variant="outlined" style={{padding: 30 }} > 
       <div style={{display:"flex" , flexDirection:"column"   }}>
       <TextField style={{marginBottom: 10 ,width: 400}}  onChange={(e) => {setTitle(e.target.value)}} fullWidth={true}  id="outlined-basic" label="Title" variant="outlined" />
       <TextField style={{marginBottom: 10}}  onChange={(e) => {setdescription(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Description" variant="outlined" /> 
       <TextField style={{marginBottom: 10}} onChange={(e) => {setimageLink(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Image" variant="outlined" />
       <TextField style={{marginBottom: 20}} onChange={(e) => {setprice(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Price" variant="outlined" />
       <Button onClick={handleCreate} variant="contained" fullWidth={true} style={{ marginBottom: "1rem" }}>CreateCourse</Button>
       </div>
       </Card>
       </div>   
    </div>
}
export default CreateCourse;