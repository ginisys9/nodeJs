const express = require("express");
const app = express();
const path = require("path");
const sql =  require('mysql2');
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
/**
 *  ! Routes are very defined 
 */
/**
 * ! MySQL Connections
 */
var db = sql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'contactdb'
})
db.connect(function(error){
    if (error) {
      console.log('Error connections',+error.stack);
      return;
    }
    console.log('MySql connected');
})
/**
 *  ! Read all database
 */
app.get('/contact',function(req,res){
    db.query('SELECT * FROM contact',function(err,rows){
      if(err) return res.status(500).send(err);
       res.send(rows)
    })
})
/**
 *  ! Read single all database
 */
app.get('/contact/:id',function(req,res){
    const noSql =  'SELECT * FROM contact WHERE id = ?';
    db.query( noSql,
      [req.params.id],function(err,rows){
      if(err) return res.status(500).send(err);
      if(rows.length === 0) return res.status(404).send({message:'Record are not Found'})
       res.send(rows[0])
    })
})
/**
 * ! create the database
 */
app.post('/contact',function(req,res){
    var {first_name,last_name,email,phone,address} = req.body,
    sql = 'INSERT INTO contact (first_name,last_name,email,phone,address) VALUES (?,?,?,?,?)';
    db.query(sql,[first_name,last_name,email,phone,address],function(err,result){
      if(err) return res.status(500).send(err);
       
      res.send({
         message:'Contact Created',
         id:result.insertId
      })
    })
})
/**
 *  ! update contact 
 */
app.put('/contact/:id',function(req,res){
    var {first_name,last_name,email,phone,address} = req.body,
    sql = 'UPDATE contact SET first_name=?,last_name=?,email=?,phone=?,address=? WHERE id=? ';
    db.query(sql,[first_name,last_name,email,phone,address,req.params.id],function(err,result){
      if(err) return res.status(500).send(err);
      if(result.affectedRows === 0) return res.status(404).send({message:'Record are not Found'})
      res.send({
         message:'Contact Updated',
      })
    })
})
/**
 * ! deleted the data
 */
app.delete('/contact/:id',function(req,res){
  
    const noSql =  'DELETE  FROM contact WHERE id = ?';
    db.query( noSql,
      [req.params.id],function(err,result){
      if(err) return res.status(500).send(err);
      if(result.length === 0) return res.status(404).send({message:'Record are not Found'})
        res.send({
            message:'Contact deleted Successfully'
        })
    })
})
app.listen(3000, () => console.log(`Server are started`));