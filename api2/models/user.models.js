const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    createAt:{
         type:Date,
         default:Date.now
    }
})
const user = mongoose.model("User",userSchema);
module.exports = user;