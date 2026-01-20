const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs")
// const { name } = require("ejs");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs")

const transpoter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,  // STARTTLS
    auth:{
        user:"ginisys9@gmail.com",
        pass:"wehsifqbeerhfcbo"
    }
})
// for the submit of the form data
app.post("/send-email",async (req,res)=>{
    const {to,subject,text} = req.body;
    // const template = fs.readFile("./views/email-template.ejs");
    // const html = ejs.render(template,{hii:"hbintekhab"})
    try {
         const info = await transpoter.sendMail({
            from:'"hbintekhab" <ginisys9@gmail.com>',
            to:to,
            subject:subject,
            text:text,
            // html:html,
            // attachments:[
            //     {
            //         filename:"student.pdf",
            //         path:path.join(__dirname,"files",'student.pdf')
            //     },
            //     {
            //         filename:"facebook.png",
            //         path:path.join(__dirname,"files",'facebook.png')
            //     }
            // ]
         })
      res.json({message:"Email send are successfully",info})

    } catch (error) {
        res.status(500).json({message:"Failed to send email",error})
    }
})



app.get("/",(req,res)=>{
     res.render("mailpage")
})

app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));