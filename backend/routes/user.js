const mongoose = require("mongoose");
const express = require('express');
const { User,  Admin, Product } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const {jwttoken } = require("../middleware/auth");
const getUserRecommendations = require('../recommendation/recommendation')

const router = express.Router();

router.get('/user/me' , jwttoken, async(req , res) => {
  res.json({
    username: req.user.username
  })
  
})

router.post('/user/signup',async  (req, res) => {
    const {username , password} = req.body
    const userExist = await User.findOne({username})
    if(userExist){
      res.status(401).send({message:"user already exist"})
    }else{
      const obj = {username , password}
      const user = new User(obj);
      await user.save();
      let token = jwt.sign(obj , SECRET)
      res.status(200).send({message : "user logged in successfully" , token: token})  
    }
  });
  
  router.post('/user/login', async (req, res) => {
    const {username , password} = req.body;
    const user = await User.findOne({username , password});
    if(user){
      const obj = {username , password}
      let jwtto = jwt.sign(obj , SECRET )
      res.status(200).send({message : "Logged in successfully" , token: jwtto})
    }else{
      
      res.status(400).send("can not login")
    }
  });
  
  router.get('/user/product', jwttoken ,async (req, res) => {
    try {
      // If the JWT authentication is successful, the execution will reach here
      const products = await Product.find({});
      res.status(200).json(products);
  } catch (error) {
      // Handle any errors that might occur during fetching products
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
  }
  });
  
  router.post('/product/:productId', jwttoken, async (req, res) => {
    
    const product= await Product.findOne({_id: req.params.productId});
    if (product) {
      
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedProduct.push(product);
        await user.save();

        res.json({ message: 'product purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
     }else {
      res.status(404).json({ message: 'product not found' });
    }
  });

  router.get("/product/:productId" , jwttoken, async (req , res) =>{
    const productId = req.params.productId
    const product = await Product.findOne({productId})
    
    console.log(product);
    if (product) {
      const user = await User.findOne({ username: req.user.username});
      if (user) {
        res.send(product)
      } else {
        res.status(403).json({ message: 'User not found' });
      }
     }else {
      res.status(404).json({ message: 'product not found' });
    }

  })
      
  router.get('/purchasedProduct', jwttoken, async (req, res) => {
    try {
        const username = req.user.username;

        // Find the user by username and populate the 'purchasedProduct' field
        const user = await User.findOne({ username }).populate('purchasedProduct');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the purchased products
        res.json({ purchasedProduct: user.purchasedProduct || [] });
    } catch (error) {
        console.error('Error fetching purchased products:', error);
        res.status(500).json({ message: 'An error occurred while fetching purchased products' });
    }
});


router.post('/productHistory/:productId', jwttoken, async (req, res) => {
    
  const product= await Product.findOne({_id: req.params.productId});
  if (product) {
    
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.viewHistory.push(product);
      await user.save();

      res.json({ message: 'product purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
   }else {
    res.status(404).json({ message: 'Course not found' });
  }
});


router.get('/user/recommendations', jwttoken, async (req, res) => {
  const username = req.user.username;
  try {
      const recommendations = await getUserRecommendations(username);
      res.status(200).json({ recommendations });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});


router.get('/user/search/recommendations', jwttoken, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    const viewedProductIds = user.viewHistory;
    const viewedProducts = await Product.find({ _id: { $in: viewedProductIds } });

    // Extract search parameters from query string
    const { search } = req.query;

    const brands = viewedProducts.map(product => product.brand).filter(Boolean);
    const colors = viewedProducts.map(product => product.color).filter(Boolean);
    const prices = viewedProducts.map(product => product.price).filter(price => price !== undefined);
    const categories = viewedProducts.map(product => product.category).filter(Boolean);
    const minPrice = Math.min(...prices) - 10000;
    const maxPrice = Math.max(...prices) + 10000 ;
    
    console.log(brands, colors , minPrice , maxPrice);
    
    const query = {
      $and: [
        { category: { $in: categories } },
        {
          $or: [
            { brand: { $in: brands } },
            { color: { $in: colors } }
          ]
        },
        { price: { $gte: minPrice, $lte: maxPrice } },
        { _id: { $nin: viewedProductIds } } // Exclude viewed products
      ]
    };

    if (search) {
      if (!query.$or) {
        query.$or = [];
      }
      query.$or.push({ $text: { $search: search } });
    }

    console.log(query);

    const recommendations = await Product.find(query).limit(10);

    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports =  router;