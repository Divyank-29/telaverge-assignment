const express = require('express');
const { jwttoken, SECRET } = require("../middleware/auth");
const { User, Course, Admin } = require("../db");


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
    const {username , password} = req.headers
    const userExist = await Admin.findOne({username , password});
    if(userExist){
      const obj = {username , password}
      let jwttoken = jwt.sign(obj , SECRET )
      res.status(200).json({ message: 'Logged in successfully', token: jwttoken })
    }else{
      res.status(401).send('cannot login')
    }
  });
  
  router.post('/admin/courses', jwttoken ,async (req, res) => {
    const course = req.body
    const newCourse = new Course(course)
    await newCourse.save();
    res.status(200).json({ message: 'Course created successfully'})
  });
  
  router.put('/admin/courses/:courseId', jwttoken , async (req, res) => {
    const courseId = req.params.courseId
    const updatecourse = req.body
    const course = await Course.findByIdAndUpdate(courseId, updatecourse , {new : true});
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/admin/courses', jwttoken ,async (req, res) => {
    const course = await Course.find({})
    if(course){
    res.status(200).send(course)
  }
  });
  
  
  router.get('/course/:courseId' ,jwttoken , async (req,res ) => {
    const courseId = req.params.courseId
    const course = await Course.findById(courseId)
    if(course){
      res.status(200).send(course)
    }
  })

  router.delete('/course/:courseId', jwttoken, async (req, res) => {
    const courseId = req.params.courseId;
    try {
      const course = await Course.findByIdAndDelete(courseId);
      if (course) {
        res.status(200).send({message: "Deleted successfully"});
      } else {
        res.status(404).send("Course not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

  
  
   module.exports = router