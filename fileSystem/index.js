const express = require("express");
const app = express();
const fs = require("fs");


app.get("/", (req, res) => {
   res.send("<h1> helloe word </h1>")
});
// write file;
app.get("/write-file", (req, res) => {
  fs.writeFile("./public/data.txt", "text are created successfuly", (error) => {
    return error
      ? res.status(500).send("failed to write file")
      : res.send("file written sucessfully");
  });
});
// read file
app.get("/read-file", (req, res) => {
  fs.readFile("./public/data.txt",  (error,data) => {
   if(error){
   return   res.status(500).send("file are not found")
   }
   res.setHeader("content-Type","plain/text")
   res.send(data)
    
  });
});
// append file 
app.get("/append-file",(req,res)=>{

     fs.appendFile("./public/data.txt", "\ncode are created successfully", (error) => {
        if(error){
    return  res.status(500).send("file are not found")
   }
    res.send("data are appended")

     })
})
// delete file
app.get("/delete-file",(req,res)=>{

     fs.unlink("./public/data.txt",(error) => {
        if(error){
      return  res.status(500).send("faild to delete file")
   }
    res.send("file deletd sucessfully")
     })
})
// read folder/directory
app.get("/read-folder",(req,res)=>{
     fs.readdir("./public",(error,files) => {
        if(error)
      {
            console.log(error);
            return
    //   return  res.status(500).send("faild to delete file")
      }
      files.forEach((file)=>{
        console.log(file);
           
      })
      res.send("Read folder are successfully");

     })
})
// rename the file
app.get("/rename-file",(req,res)=>{
      fs.rename("./public/data.txt","./public/output.txt",(error) => {
     if(error){
      return  res.status(500).send("faild to rename file")
     }
    res.send("file rename sucessfully")
     })
})
// stream data
app.get("/stream-data",(req,res)=>{
    const fileStream = fs.createReadStream("./public/data.json");
    fileStream.on('open',()=>{
        fileStream.pipe(res)
    })
    fileStream.on('error',(error)=>{
   res.status(500).send("file are not found or error reading file")
    })
})
// create folder
app.get("/create-folder",(req,res)=>{
     fs.mkdir("./public/js",(error) => {
     if(error){
      return  res.status(500).send("Error creating folder")
     }
    res.send("folder created sucessfully")
     })
})

// rename folder
app.get("/rename-folder",(req,res)=>{
     fs.rename("./public/js","./public/javascript",(error) => {
     if(error){
      return  res.status(500).send("Error renaming folder")
     }
    res.send("folder rename sucessfully")
     })
})
// delete folder
app.get("/delete-folder",(req,res)=>{
     fs.rmdir("./public/javascript",(error) => {
     if(error){
      return  res.status(500).send("Error deleting folder")
     }
    res.send("folder deleted sucessfully")
     })
})
// read pdf file

app.get("/read-pdf", (req, res) => {
  fs.readFile("./public/student.pdf",  (error,data) => {
   if(error){
   return   res.status(500).send("pdf are not found")
   }
   res.setHeader("content-Type","application/pdf")
   // can also be createReadStream
   res.send(data)
  });
});

// read json file

app.get("/read-json", (req, res) => {
  fs.readFile("./public/data.json",  (error,data) => {
   if(error){
   return   res.status(500).send("json are not found")
   }
   res.setHeader("content-Type","application/json")

   res.send(data)
  });
});

// write json file
app.get("/write-json", (req, res) => {
  const data = {name:"hbintekhab",age:"22",email:"hbintekhab@gmail.com"}
  fs.writeFile("./public/data.json",JSON.stringify(data), (error) => {
   if(error){
   return   res.status(500).send("faild to write json file")
   }
   res.send("json file written successfully")
  });
});

// write json file and keep existing data

app.get("/append-json", (req, res) => {
  const newData = {name:"hbintekhab",age:"22",email:"hbintekhab@gmail.com"}
  //  first we read the file
  fs.readFile("./public/student.json",(error,data) => {
   if(error){
   return   res.status(500).send("faild to read json file");
   }
   let jsonData;
   jsonData = JSON.parse(data);
   if(!Array.isArray(jsonData))
   {
     jsonData = [jsonData]
   }
    jsonData.push(newData);
    fs.writeFile("./public/student.json",JSON.stringify(jsonData), (error) => {
   if(error){
   return   res.status(500).send("faild to write json file")
   }
   res.send("json file Appended are successfully")
  });
  });
});
// read image file 
app.get("/read-image",(req,res)=>{
   fs.readFile("./public/image.jpg",  (error,data) => {
   if(error){
   return   res.status(500).send("image are not found")
   }
   res.setHeader("content-Type","image/jpeg")
   res.send(data)
  });

})
// read video file 
app.get("/read-video",(req,res)=>{
   fs.readFile("./public/data.mp4",  (error,data) => {
   if(error){
   return   res.status(500).send("video are not found")
   }
   res.setHeader("content-Type","video/mp4")
   res.send(data)
  });
})
// getting information for the file 
app.get("/file-info",(req,res)=>{
   fs.stat("./public/img.jpg",  (error,data) => {
   if(error){
   return res.status(500).send("file are not found")
   }
   res.send(data)
   console.log("File: " + data.isFile());
   console.log("Folder: " + data.isDirectory());
  });
})
// check if file are exist
app.get("/file-exist",(req,res)=>{
   fs.stat("./public/img.jpg",  (error) => {
   if (error) {
      res.send("File are does not exist")
   }
   res.send("<h1> file are exist </h1>")
  });
})


app.listen(3000, function () {
  console.log("server are started");
});
