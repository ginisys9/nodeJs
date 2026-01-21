const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const csrf = require("csurf")

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine","ejs")

/**
 * ! add middleware 
 */
app.use(cookieParser())
const csrfProtection = csrf({cookie:true})
app.get("/",function(req,res){
   
     res.send("<h1> Home Page </h1>")
})
app.get("/form",csrfProtection, function(req,res){
     res.render("form",{myToken: req.csrfToken()})
})
app.post("/submit",csrfProtection,function(req,res){
    res.send(req.body)
})
app.listen(3000, () => console.log(`app are started `));