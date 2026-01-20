const express = require("express");
const app = express();
const path = require("path");
const studentRoutes = require("./routes/student.routes")
const connectDb = require("./config/database")
const cors = require("cors");
connectDb()
const PORT = process.env.PORT;
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("./upload",express.static(path.join(__dirname,'upload')));

app.use(cors())

app.use("/api/students",studentRoutes)
/**
 * ! adding middleware of the images 
 */

app.use(function(error,req,res,next){
     if(error instanceof MulterError)
     {
     return  res.status(400).send(`Iamges Error:${error.message}:${error.code}`);
     }
     else if(error)
     {
        return res.status(500).send(`Something went wrong ${error.message}`)
     }
     next()
})

app.listen(PORT, () => console.log(`server are running on port ${PORT}`));