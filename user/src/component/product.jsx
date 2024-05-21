/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect , useState } from "react";
import {Card , Typography ,  Button , CardMedia , CardContent} from '@mui/material';


function ShowProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/user/product`, {
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
                                
                                alert('productviewed successfully');
                            } else {
                                console.error('Failed to view product:', res.statusText);
                                alert('Failed to view product. Please try again.');
                            }
                        }).catch(error => {
                            console.error('Error viewing prodcut:', error);
                            alert('An error occurred while purchasing the product. Please try again later.');
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
    );
}




export default ShowProduct;