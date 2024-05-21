/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import {Card , Typography , CardMedia , CardContent, Button } from '@mui/material';

function ShowProducts() {
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found in local storage");
            return;
        }

        fetch(`http://localhost:3000/purchasedProduct`, {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.purchasedProduct) {
                setProducts(data.purchasedProduct);
                console.log('Purchased products:', data.purchasedProduct);
            } else {
                console.warn('No purchased products found in the response:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching purchased products:', error);
        });
    }, []);


    return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 350px)", gap: "20px", justifyContent: "center", marginTop: 80 }}>
            {products.map(product => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    )
    
}

function Product (props){
   let product = props.product

   if(!product){
    return <h1>
        cart is empty
        </h1>
   }
  return(
    <div>
        <Card sx={{ maxWidth: 345 }} style={{ display: "grid"}}>
    <CardMedia
        component="img"
        image={product.images}
        sx={{ height: 180 }}
    />
    <div>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
               {product.brand} {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.description}
            </Typography>
        </CardContent>
        <div style={{ marginLeft: 15, justifyContent: "space-between", display: "flex" }}>
            <div>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    ₹ {product.price}
                </Typography>
            </div>
            <div>
                <Button
                    style={{ marginRight: 20, marginTop: 10 }}
                    variant="contained"
                    onClick={() => {
                        fetch(`http://localhost:3000/productHistory/` + product._id, {
                            method: "POST",
                            headers: {
                                "authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then((res) => {
                            if (res.ok) {
                                console.log("course");
                                alert('Course viewed successfully');
                            } else {
                                console.error('Failed to view course:', res.statusText);
                                alert('Failed to view course. Please try again.');
                            }
                        }).catch(error => {
                            console.error('Error viewing course:', error);
                            alert('An error occurred while purchasing the course. Please try again later.');
                        })
                    }}
                >
                    View
                </Button>
            </div>
            <div>
                <Button
                    style={{ marginRight: 20, marginTop: 10 }}
                    variant="contained"
                    onClick={() => {
                        fetch(`http://localhost:3000/product/` + product._id, {
                            method: "POST",
                            headers: {
                                "authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then((res) => {
                            if (res.ok) {
                                console.log("course");
                                alert('Course purchased successfully');
                            } else {
                                console.error('Failed to purchase course:', res.statusText);
                                alert('Failed to purchase course. Please try again.');
                            }
                        }).catch(error => {
                            console.error('Error purchasing course:', error);
                            alert('An error occurred while purchasing the course. Please try again later.');
                        })
                    }}
                >
                    Buy
                </Button>
            </div>
        </div>
    </div>
</Card>
</div>
  )
 }
   
    



export default ShowProducts;
