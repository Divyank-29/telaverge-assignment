const mongoose = require("mongoose");
const express = require('express');
const { User, Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const {jwttoken } = require("../middleware/auth");

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
  
  router.get('/user/courses', jwttoken ,async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
  });
  
  router.post('/courses/:courseId', jwttoken, async (req, res) => {
    
    const course = await Course.findOne({_id: req.params.courseId});
    if (course) {
      
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();

        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
     }else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

  router.get("/course/:courseId" , jwttoken, async (req , res) =>{
    const courseId = req.params.courseId
    const course = await Course.findOne({courseId})
    
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username});
      if (user) {
        res.send(course)
      } else {
        res.status(403).json({ message: 'User not found' });
      }
     }else {
      res.status(404).json({ message: 'Course not found' });
    }

  })
      
  
  
  router.get('/purchasedCourses', jwttoken ,  async (req, res) => {
    const user = await User.findOne({ username:req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });
  
  module.exports =  router