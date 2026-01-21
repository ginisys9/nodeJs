import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
/**
 * ! database are connections
 */
export const connectDB = () =>{
     mongoose.connect(process.env.MONGO_URL)
    .then(function(){
         console.log("database are connected successfully");
    })
}






// export const noContact = () =>{
//      mongoose.connect(process.env.MONGO_URL)
//      .then(function(ele){
//            console.log('database are connected successfully',ele);
           
//      })
// }