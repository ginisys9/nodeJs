const express = require("express");
const app = express();
// const router = express.Router();

// router.use(function(req,res,next){
//     var date = new Date();
//     res.send(`<h1> date:${date.getFullYear()}`);
//     next()
// })
// router.get("/",function(req,res){
//     res.send("<h1> Home page");
// })
// router.get("/about",function(req,res){
//     res.send("<h1> About page");
// })
// app.use("/test",router)



// app.get("/about",dayMiddleWare, function (req, res) {
//     res.send("<h1> about page </h1>");
//   });
  
// // app.use(function (req, res, next) {
// //   const date = new Date();
// //   res.send(`<h1>time: ${date.getHours()}/ ${date.getMinutes()} </h1>`)
// //   next();
// // });

// function middleware(req,res,next){
//   const date = new Date();
//   res.send(`<h1>time: ${date.getHours()}/ ${date.getMinutes()} </h1>`)
//    next()
// }
// function dayMiddleWare(req,res,next){
//   const date = new Date();
//   res.send(`<h1>date: ${date.getMonth()}/ ${date.getDay()} </h1>`)
//   next()
// }


// // app.use(middleware)

// app.get("/",middleware,function (req, res) {
//   res.send("<h1>Home page</h1>");
// });
app.get('/', (req, res) => {
     res.send("<h1> Home page </h1>")
});
app.get('/about', (req, res) => {
  res.send("<h1> About page </h1>")
});
app.get('/contact', (req, res) => {
  res.send("<h1> contact page </h1>")
});
app.use(function(req,res){
   res.send("<h1>Error 404: page are not found...</h1>")
})
app.use(function(error,req,res,next){
     console.log(error);
     res.status(500).send("something are Broke")
})
app.listen(3000, function () {
  console.log("server are started");
});
