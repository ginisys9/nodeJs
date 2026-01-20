const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs')
const cron = require("node-cron")
const sourceDir = path.join(__dirname,'data');
const backupDir = path.join(__dirname,'backups')
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("Hello World!"));
/**
 *  ! How to backup the data from the interval
 */
cron.schedule("* * * * * ",async function(req,res){
     try{
        var timestamp = new Date().toISOString().replace(/[:.]/g,"-"),
         destination = path.join(backupDir,`backup-${timestamp}`);
        await fs.cp(sourceDir,destination,{recursive:true},function(err){
            if (err) {
                console.log('Backup failed:',err);
            }else{
               console.log(`Backup created at ${destination}`);
            }
        })
     }catch(error) {
        console.error('Backup failed successfully:',error);
     }
})
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));