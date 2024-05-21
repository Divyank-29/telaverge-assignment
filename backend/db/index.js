const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    username : String,
    password: String,
    purchasedProduct: [{type : mongoose.Schema.Types.ObjectId , ref: 'product'}],
    viewHistory: [{type : mongoose.Schema.Types.ObjectId , ref: 'product'}]
  })
  
  const adminSchema = new mongoose.Schema({
    username : String,
    password : String
  })
  
  const productSchema = new mongoose.Schema({
    name: { 
      type: String,
       required: true
       },
       description: { 
       type: String,
       required: true 
      },
      price: { 
      type: Number,
       required: true
       },
      color: {
        type:String,
      },
      category: { 
      type: String,
      required: true
       },
      images: {
          type : String,
       },
      brand: {
          type: String,
      }
  })

  productSchema.index({ name: 'text', description: 'text' , brand:"text"  });
  
 const User = mongoose.model('user', userSchema);
 const Admin = mongoose.model('admin' , adminSchema);
 const Product = mongoose.model('product' , productSchema); 
 
 Product.createIndexes();
 
 module.exports = {
  User,
  Admin,
  Product
}