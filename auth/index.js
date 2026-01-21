var  express = require("express"),
 app = express(),
 path = require("path"),
 session = require("express-session"),
 bcryptjs = require("bcryptjs"),
 mongoose = require("mongoose"),
 User = require("./models/user.models")
 
/**
 *  ! database are connections
 */

mongoose.connect("mongodb://127.0.0.1:27017/crud").then(function(){
     console.log("database are connected");
})
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));// app.set("views","/views")
app.set("view engine","ejs")
/**
 * ! creating the session
 */

app.use(session({
     secret:"secret123",
     resave:false,
     saveUninitialized:false
}))

var checkLogin = function(req,res,next){
     if(req.session.user)
     {   next () }
     else { res.redirect("login") }
}

/**
 * ! Routing 
 */

app.get("/",checkLogin,function(req,res){
     res.send(`<h1>session are created:${req.session.user}</h1> <a href="/logout"> logout </a>`)
})
app.get("/profile",checkLogin,function(req,res){
     res.send(`<h1>logout are successfully:${req.session.user}</h1> <a href="/logout"> logout </a>`)
})

app.get('/login', (req, res) => {
    if(req.session.user)
    {
        res.redirect("/")
    }else{
        res.render("login",{error:null})
    }
 
});
app.get('/register', (req, res) => {
    res.render("register",{error:null})
});

app.post('/register', async (req, res) => {
    const {username,userPass} = req.body;
    const hashedPass = await bcryptjs.hash(userPass,10)
    await User.create({username,userPass:hashedPass})
    res.redirect("/login")
});

app.post("/login",async function(req,res){
 const {username,userPass} = req.body;
 const user = await User.findOne({username})
 if(!user) return res.render("login",{error:"user not found"})
 const isMatched = await bcryptjs.compare(userPass,user.userPass)
 if(!isMatched) return res.render("login",{error:"invalid password"});
  req.session.user = username;
 res.redirect("/")
})

app.get('/logout', (req, res) => {
     req.session.destroy(function(){
         res.redirect("/login")
     })
});
app.listen(3000, () => console.log("server are started "));