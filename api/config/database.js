const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv")
dotenv.config()

const connectDb = function(){
    mongoose.connect(process.env.MONGO_URL).then(function(){ console.log("connected to the database");
    }).catch(function(error){console.log(error);
    })
}
module.exports = connectDb;