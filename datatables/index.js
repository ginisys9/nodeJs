const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user.models");

// middleware 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// connect mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user_demo')
.then(()=>{console.log("database are connected");
})
// ! get all the user

// app.get('/api/user',async (req,res)=>{
//     const user = await user.find();
//     res.json({data:user})
// })

app.get("/api/users",async function(req,res){
      const users = await User.find();
      res.json({data:users});
})

app.listen(3000,()=>{console.log("server are started");
})