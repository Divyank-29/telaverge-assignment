/* eslint-disable no-unused-vars */
import React , {useState} from "react";
import { Typography , TextField , Button  , Card} from "@mui/material";

function CreateProduct() {
    // eslint-disable-next-line no-unused-vars
    const [Name, setName] = React.useState("");
    const [description , setdescription] = React.useState("")
    const [imageLink , setimageLink] = React.useState("")
    const [price , setprice] = React.useState("")
    const [brand , setBrand] = React.useState("")
    const [color ,setColor] = React.useState("")
    const [category , setcategory] =React.useState("")
     

    const handleCreate = () => {
        fetch("http://localhost:3000/admin/product", {
          method: "POST",
          body: JSON.stringify({
           name : Name,
           description: description,
           price: price,
           color: color,
           category: category,
           images: imageLink,
           brand: brand
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
       
       <Typography> Create Priduct </Typography>
       <div style={{display : "flex" , justifyContent: "center" , marginTop:200 } }>
       <Card variant="outlined" style={{padding: 30 }} > 
       <div style={{display:"flex" , flexDirection:"column"   }}>
       <TextField style={{marginBottom: 10 ,width: 400}}  onChange={(e) => {setName(e.target.value)}} fullWidth={true}  id="outlined-basic" label="Name" variant="outlined" />
       <TextField style={{marginBottom: 10 ,width: 400}}  onChange={(e) => {setColor(e.target.value)}} fullWidth={true}  id="outlined-basic" label="color" variant="outlined" />
       <TextField style={{marginBottom: 10 ,width: 400}}  onChange={(e) => {setBrand(e.target.value)}} fullWidth={true}  id="outlined-basic" label="Brand" variant="outlined" />
       <TextField style={{marginBottom: 10 ,width: 400}}  onChange={(e) => {setcategory(e.target.value)}} fullWidth={true}  id="outlined-basic" label="category" variant="outlined" />
       <TextField style={{marginBottom: 10}}  onChange={(e) => {setdescription(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Description" variant="outlined" /> 
       <TextField style={{marginBottom: 10}} onChange={(e) => {setimageLink(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Image" variant="outlined" />
       <TextField style={{marginBottom: 20}} onChange={(e) => {setprice(e.target.value)}} fullWidth = {true}  id="outlined-basic" label="Price" variant="outlined" />
       <Button onClick={handleCreate} variant="contained" fullWidth={true} style={{ marginBottom: "1rem" }}>create Product</Button>
       </div>
       </Card>
       </div>   
    </div>
}
export default CreateProduct;