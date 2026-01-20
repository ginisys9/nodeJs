const express = require("express");
const app = express();
const path = require("path");
const cookie = require("cookie-parser")
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
/**
 *  ! setCookie 
 */
// app.use(cookie("mySecretKey123"))
app.use(cookie())
app.get("/",function(req,res){
     var name = "<h1> Home page:</h1>";
    const username = req.cookies.username;

    !username ? res.send(`<h1>${name} no cookie are found </h1>`) : res.send(`<h1>${name} cookie are found:${username}</h1>`)
});

app.get("/setcookie",function(req,res){
    res.cookie("username","hbintekhab",{
         maxAge:1000*60*15,
         httpOnly:true,
        //   signed:true   
    }),
    res.send(`<h1> cookie has been sent </h1>`)
})

app.get("/readcookie",function(req,res){
    const username = req.cookies.username;
    // const username = req.signedCookies.username;
    !username ? res.send(`<h1> no cookie are found </h1>`) : res.send(`<h1>cookie are found:${username} </h1>`)
})

app.get("/deletecookie",function(req,res){
   res.clearCookie("username")
   res.send(`<h1>cookie has been deleted </h1>`)
})
app.listen(3000, () => console.log(`app are started`));