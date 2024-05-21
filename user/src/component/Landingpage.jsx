import  { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button, Card, CardMedia, CardContent, Typography } from "@mui/material";

function LandingPage() {
    const [useremail, setUserEmail] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/user/me', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.username) {
                setUserEmail(data.username);
            }
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/user/recommendations', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(data => {
            setRecommendations(data.recommendations);
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
        });
    }, []);

    const handlePurchase = (id) => {
        fetch(`http://localhost:3000/product/` + id, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            if (res.ok) {
                alert('Product purchased successfully');
            } else {
                console.error('Failed to purchase product:', res.statusText);
                alert('Failed to purchase product. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error purchasing product:', error);
            alert('An error occurred while purchasing the product. Please try again later.');
        });
    };

    const handleView = (id) => {
        fetch(`http://localhost:3000/productHistory/` + id, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            if (res.ok) {
                alert('Product viewed successfully');
            } else {
                console.error('Failed to view product:', res.statusText);
                alert('Failed to view product. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error viewing product:', error);
            alert('An error occurred while viewing the product. Please try again later.');
        });
    };

    return (
        <div>
            {useremail ? (
                <div>
                    <h1>Recommended Products</h1>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, 350px)", gap: "20px", justifyContent: "center", marginTop: 80 }}>
                        {recommendations.map(recommendation => (
                            <Recommendation
                                key={recommendation._id}
                                recommendation={recommendation}
                                onPurchase={handlePurchase}
                                onView={handleView}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ letterSpacing: 0.2, marginTop: 100, paddingLeft: 150 }}>
                        <Button
                            style={{ marginRight: 10 }}
                            onClick={() => { window.location.href = 'Register' }}
                            size="large"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Recommendation(props) {
    const { recommendation, onPurchase, onView } = props;

    return (
        <div style={{ display: "grid" }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    image={recommendation.images}
                    alt={recommendation.name}
                    sx={{ height: 180 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {recommendation.brand} {recommendation.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recommendation.description}
                    </Typography>
                    <div style={{ marginLeft: 15, justifyContent: "space-between", display: "flex" }}>
                        <div>
                            <Typography variant="subtitle2" style={{ color: "gray" }}>
                                Price
                            </Typography>
                            <Typography variant="subtitle1">
                                ₹ {recommendation.price}
                            </Typography>
                        </div>
                        <div>
                            <Button
                                style={{ marginRight: 20, marginTop: 10 }}
                                variant="contained"
                                onClick={() => onPurchase(recommendation._id)}
                            >
                                Buy
                            </Button>
                            <Button
                                style={{ marginRight: 20, marginTop: 10 }}
                                variant="contained"
                                onClick={() => onView(recommendation._id)}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Adding PropTypes validation
Recommendation.propTypes = {
    recommendation: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        images: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        brand: PropTypes.string.isRequired

    }).isRequired,
    onPurchase: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired
};

export default LandingPage;
