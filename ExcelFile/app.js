const express = require("express");
const app = express('path');
const multer = require('multer');
const path = require("path");
const ejs = require('ejs')
const xlsx = require('xlsx')
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
/**
 * ! set the view engine
 */
app.set('view engine','ejs')
// app.set('views',path.join(__dirname,'views'))

const upload = multer({dest:'uploads/'});

app.get("/",function(req,res){
       res.render('excel')
});

app.post('/upload-excel',upload.single('excelFile'),function(req,res){
   var filePath = path.join(__dirname,'uploads',req.file.filename),
   workBook = xlsx.readFile(filePath),
   workSheet = workBook.Sheets[workBook.SheetNames[0]],
   data = xlsx.utils.sheet_to_json(workSheet);
   res.json({
    message:'Excel file uploaded Successfully',
    data
   })
  // res.render('json',{data})
})
/**
 * ! Export excel File
 */

app.get('/export-file',function(req,res){
  var data = 
  [
    {name:'Intekhab',age:24,city:'NewYork'},
    {name:'Rizwan',age:26,city:'NewDelhi'},
    {name:'Adil',age:28,city:'noida'},
  ]
  var workSheet = xlsx.utils.json_to_sheet(data),
  workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook,workSheet,'Sheet1');
  const excelBuffer =  xlsx.write(workBook,{bookType:'xlsx',type:'buffer'});

res.setHeader('content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
res.setHeader('Content-Diposition','attachment; filename=data.xlsx');
res.send(excelBuffer)

})

app.listen(3000, () => console.log(`server are started`));