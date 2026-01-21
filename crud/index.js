import express from "express"
const app = express();
import contactRoutes from "./routes/contact.routes.js"
import { connectDB} from "./config/database.js";
const PORT = process.env.PORT;
/**
 * ! database connections
 */
connectDB()
/**
 * !! Middleware
 */
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

/**
 * ! Routes
 */

app.use("/",contactRoutes)
app.listen(PORT, () => console.log(` app listening on port port! ${PORT}`));