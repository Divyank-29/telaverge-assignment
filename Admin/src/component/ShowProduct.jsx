/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect , useState } from "react";
import {Card , Typography ,  Button , CardMedia , CardContent} from '@mui/material';

function ShowProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/admin/product`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                // Handle error (e.g., show error message to the user)
            });
    }, []);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 350px)", gap: "20px", justifyContent: "center", marginTop: 80 }}>
            {products.map(product => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    );
}

function Product(props) {
    const { product } = props;

    return (
        <div>
            <Card style={{
                margin: 10,
                display: "grid",
            }}>
                <CardMedia
                    component="img" // Specify the component as "img"
                    image={product.images} // Provide the image URL
                    alt={product.name} // Specify the alt text for accessibility
                    sx={{ height: 180 }}
                />
                <div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
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
                            
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}


export default ShowProduct;