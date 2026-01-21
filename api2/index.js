const express = require("express");
const app = express();
const path = require("path");
const studentRoutes = require("./routes/student.routes")
const cors = require("cors");
const connectDb = require("./config/database")
const auth = require("./middleware/auth")
const userRoutes = require("./routes/user.routes")
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
connectDb()
const PORT = process.env.PORT;

const limiter = rateLimit({
   windowMs:1000*60*1,
   max:5,
   message:"Too many request from this ip,please try again later."
})



// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/upload",express.static(path.join(__dirname,"upload")))
app.use(cors())

app.use(limiter);
// app.use(helmet()); this is only for the online server 
app.use("/api/users",userRoutes)
app.use(auth)
app.use("/api/students",studentRoutes)
/**
 * ! adding middleware of the images 
 */

app.use(function(error,req,res,next){
     if(error instanceof MulterError)
     {
     return  res.status(400).send(`Images Error:${error.message}:${error.code}`);
     }
     else if(error)
     {
        return res.status(500).send(`Something went wrong ${error.message}`)
     }
     next()
})

app.listen(PORT, () => console.log(`server are running on port ${PORT}`));