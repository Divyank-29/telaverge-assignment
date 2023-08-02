const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    username : String,
    password: String,
    purchasedCourses: [{type : mongoose.Schema.Types.ObjectId , ref: 'course'}]
  })
  
  const adminSchema = new mongoose.Schema({
    username : String,
    password : String
  })
  
  const courseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published: Boolean
  })
  
 const User = mongoose.model('user', userSchema);
 const Admin = mongoose.model('admin' , adminSchema);
 const Course = mongoose.model('course' , courseSchema); 

 module.exports = {
  User,
  Admin,
  Course
}