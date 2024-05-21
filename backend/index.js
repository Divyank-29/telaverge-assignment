const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require ("./routes/admin.js")
const userRouter = require("./routes/user.js")
const app = express(); 
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use(adminRouter);
app.use(userRouter);


mongoose.connect(process.env.MONGO_DB_URI  , { useNewUrlParser: true, useUnifiedTopology: true, dbName: "e-comm" }).then(() => {
  console.log('Connected to MongoDB');
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
}); 
