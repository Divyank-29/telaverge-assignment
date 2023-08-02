const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require ("./routes/admin.js")
const userRouter = require("./routes/user.js")
const app = express(); 
app.use(cors());
app.use(express.json());

app.use(adminRouter);
app.use(userRouter);


mongoose.connect('mongodb+srv://somanidivyank1:9IicPf5bUHWxtPJg@cluster0.4iigtwq.mongodb.net/COURSES' , { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
