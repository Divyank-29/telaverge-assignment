const express = require('express');
const { jwttoken, SECRET } = require("../middleware/auth");
const { Product, Admin } = require("../db");
const jwt = require('jsonwebtoken')

const router = express.Router();






router.get('/admin/me' , jwttoken ,  (req , res) => {
  res.json({
      username: req.user.username
    })
  } )
  
  
  
  
  router.post('/admin/signup', async (req, res) => {
    const {username , password} = req.body
    const admin = await Admin.findOne({username})
    if (admin){
      res.status(401).send("user already exist")
    }else{
      const obj = {username , password}
      const newAdmin =  new Admin(obj);
      await newAdmin.save();
      const token = jwt.sign(obj  , SECRET );
      res.status(200).json({ message: 'Admin created successfully', token: token })
    }
  });
  
  router.post('/admin/login', async (req, res) => {
    const {username , password} = req.body
    const userExist = await Admin.findOne({username , password});
    if(userExist){
      const obj = {username , password}
      let jwttoken = jwt.sign(obj , SECRET )
      res.status(200).json({ message: 'Logged in successfully', token: jwttoken })
    }else{
      res.status(401).send('cannot login')
    }
  });
  
  router.post('/admin/product', jwttoken ,async (req, res) => {
    const product = req.body
    const newProduct = new Product(product)
    await newProduct.save();
    res.status(200).json({ message: 'product created successfully'})
  });

  router.get('/admin/product', jwttoken, async (req, res) => {
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
  
  
  
   module.exports = router