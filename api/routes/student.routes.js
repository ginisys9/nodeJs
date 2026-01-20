const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path");
const fs = require("fs")
const Student = require("../models/student.model");
/**
 * ! to define the multer package 
 */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"./upload")
    },
    filename:function(req,file,cb){
      var newFile = Date.now()+path.extname(file.originalname)
      cb(null,newFile)
    }
})


const fileFilter = function(req,file,cb){
  const isImage = file.mimetype.startsWith("image/")
// !  isImage = cb(null,true) ?
  if(isImage){
    cb(null,true)
  }
  else{
    cb(new Error("only images are allowed"),false)
  }
//   return  isImage ? cb(null,true) : cb(new Error("only images are allowed"),false)
}
const upload = multer({
    storage:storage,
    limits:{
      fieldSize:1024*1024*6
    },
    fileFilter:fileFilter
})


/**
 * ! get all student 
 */
router.get("/",async function(req,res){
     try {
        const student = await Student.find()
        res.json(student)
     } catch (error) {
      
      res.status(500).json({message:error.message})
     }
})
/**
 * ! single student
 */
router.get("/:id",async function(req,res){
     try {
      const student = await Student.findById(req.params.id)
      if(!student) return res.status(404).json({message:"student are not found..."})
      res.json(student)
     } catch (error) {
        res.status(500).json({message:error.message})
     }
})
/**
 * ! add new student
 */
router.post("/",upload.single("profile_pic"),async function(req,res){
   try {
      //  const newStudent = await Student.create(req.body)
      const student = new Student(req.body)
      if(req.file)
      { 
        student.profile_pic = req.file.filename;
      }
      const newStudent = await student.save()
       res.status(201).json(newStudent)
   } catch (error) {
      res.status(400).json({message:error.message})
   }
})
/**
 * ! update the  student
 */
router.put("/:id",upload.single("profile_pic"),async function(req,res){
   try {
       const existingStudent = await Student.findById(req.params.id)
       if(!existingStudent) {
         if(req.file.filename){
            const filePath = path.join("./upload",req.file.filename)
            fs.unlink(filePath,function(error){
               if(error){
                  console.log("failed to delete image",error);
               }
            })
         }
         return res.status(404).json({message:"Student are not found"})
       }
      if(req.file)
      {
         if(existingStudent.profile_pic)
         {
            const oldPathPic = path.join("./upload",existingStudent.profile_pic)
            fs.unlink(oldPathPic,function(error){
               if(error){
                  console.log("failed to delete old image",error);
               }
            })
         }
      req.body.profile_pic = req.file.filename    
      }
      const updateStudent = await Student.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.json(updateStudent)
   } catch (error) {
      res.status(500).json({message:error.message})
   }
})
/**
 * ! delete the  student
 */
router.delete("/:id",async function(req,res){
   try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if(!student) return res.status(404).json({message:"Student are not found"})
         if(student.profile_pic)
         {
            const filePath = path.join("./upload",student.profile_pic)
            fs.unlink(filePath,function(error){
               if(error){
                  console.log("failed to delete",error);
               }
            })
         }
         res.json("student deleted")
   } catch (error) {
      res.status(500).json({message:error.message})
   }
})
module.exports = router;