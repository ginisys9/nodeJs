import contact from "../models/contact.models.js";
import Contact from "../models/contact.models.js"
import mongoose from "mongoose"

export const getContacts =  async (req, res) =>{
    try {
     const {page=1,limit=5} = req.query;
     const options = {
         page:parseInt(page),
         limit:parseInt(limit)
     }
 
     const result = await Contact.paginate({},options)
    //  res.send(result)
        res.render("home",{
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            currentPage:result.page,
            counter:result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            myContact:result.docs
        })
    } catch (err) {
        res.render("500",{message:err})
    }

};
export const getContact =  async (req, res) =>{
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        res.render("404",{message:"invalid Id"})
    }
    try {
        const contact = await Contact.findById(req.params.id)
        if(!contact) return res.render("404",{message:"contact not found"})
        res.send("show-contact",{myContact:contact})
    } catch (error) {
      res.render("500",{message:error})     
    }
   
 };
export const addContactPage = async (req,res) =>{
     res.render("add-contact")
}
export const addContact = async (req,res) =>{
     try {
        await Contact.create(req.body)
        res.redirect("/")
     } catch (error) {
        res.render("404",{message:error})
     }

}
export const updateContact = async (req, res) =>{
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        res.render("404",{message:"invalid Id"})
    }
    const contact = await Contact.findById(req.params.id)
     res.render("update-contact",{myContact:contact})
};
export const updateContactPage = async (req, res) =>{
    /**
     * ! they are used when data feild and name are matched  are same
     */
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        res.render("404",{message:"invalid Id"})
    }
    const {first_name,last_name,email,phone,address} = req.body
    /**
     *  ! when data feild and name are not matched then we are destructing object
    */
     await Contact.findByIdAndUpdate(req.params.id,{first_name,last_name,email,phone,address})   
     res.redirect("/")
};

export const deleteContactPage = async (req, res) =>{
    const paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!paramId){
        res.render("404",{message:"invalid Id"})
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/")
};