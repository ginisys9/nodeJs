var express = require("express"),
 app = express(),
 path = require("path"),
 sequelize = require('./models/index'),
 Contact = require('./models/contact')
sequelize.sync().then(function(){console.log('Database * Table are connected');
}).catch(function(error){
     console.log('Error'+error);
})

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

/**
 * ! Read all the contact
 */
app.get('/contacts',async function(req,res){
     try {
          const contact = await Contact.findAll()
         res.json(contact)
     } catch (error) {
          res.status(500).json({error:error.message})
     }
})
/**
 * ! Read single contact
 */
app.get('/contacts/:id',async function(req,res){
     try {
          const contact = await Contact.findByPk(req.params.id)
          if(!contact) return res.status(404).json({error:'Contact are not found'})
         res.json(contact)
     } catch (error) {
          res.status(500).json({error:error.message})
     }
})
/**
 * ! create contact
 */
app.post('/contacts',async function(req,res){
     try {
          const contact = await Contact.create(req.body)
           res.json(contact)
     } catch (error) {
          res.status(500).json({error:error.message})
     }
})
/**
 *  ! update the single records
 */
app.put('/contacts/:id',async function(req,res){
     try {
          const contact = await Contact.findByPk(req.params.id)
          if(!contact) return res.status(404).json({error:'Contact are not found'})
         await Contact.update(req.body,{where:{id:req.params.id}})
          const updated_contact = await Contact.findByPk(req.params.id)
       
         res.json(updated_contact)
     } catch (error) {
          res.status(500).json({error:error.message})
     }
})
/**
 *  ! delete the single records
 */
app.delete('/contacts/:id',async function(req,res){
     try {
          const contact = await Contact.findByPk(req.params.id)
          if(!contact) return res.status(404).json({error:'Contact are not found'})
         await contact.destroy()
         res.json(contact)
     } catch (error) {
          res.status(500).json({error:error.message})
     }
})
app.listen(3000, () => console.log(`Server are started`));
