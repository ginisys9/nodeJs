const jwt = require("jsonwebtoken");
const User = require("../models/user.models")

const auth = async function(req,res,next){
   try {
     const bearerHeader = req.headers['authorization']
     if(typeof bearerHeader != 'undefined'){
        var token = bearerHeader.split(' ')[1],
        user = jwt.verify(token,process.env.JWT_SECRET)
        req.token = user;
        next()
     }
     else{
        res.status(401).json({message:'no token are provided'})
     }
   } catch (error) {
        res.status(403).json({message:'invalid or expired token'})
   }
}
module.exports = auth;