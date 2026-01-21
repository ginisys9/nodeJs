import express from "express";
import { addContact, addContactPage, deleteContactPage, getContact, getContacts, updateContact, updateContactPage } from "../controller/contact.controller.js";

const router = express.Router();

router.get("/",getContacts);
router.get("/show-contact/:id",getContact);
router.get("/add-contact",addContact);
router.post("/add-contact",addContactPage)
router.get("/update-contact/:id",updateContact)
router.post("/update-contact/:id",updateContactPage)
router.get("/delete-contact/:id",deleteContactPage)

export default router;