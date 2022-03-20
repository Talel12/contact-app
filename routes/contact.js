const express = require('express')
const router = express.Router()
const ContactModel = require("../models/Contact")

router.post("/insert", async (req, res) => {
    const contact = new ContactModel({
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        contactDescription: req.body.contactDescription,
        contactImage: req.body.contactImage
    });

    try {
        await contact.save()
        res.send("inserted data .")
        // console.log('data created')
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/', (req, res) => {
    ContactModel.find({})
        .then(result => res.send(result),
        // console.log('task run .....')
    )
        .catch(err => console.log(err.message))
})

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    await ContactModel.findByIdAndRemove(id).exec();
    res.send("")
})

router.put("/update/:id", async (req, res) => {
    const id = req.params.id
    const newName = req.body.el.contactName
    const newNumber = req.body.el.contactNumber
    const newDescription = req.body.el.contactDescription
    await ContactModel.findById(id).then(async (updatedContact, err) => {
        updatedContact.contactName = newName
        updatedContact.contactNumber = newNumber
        updatedContact.contactDescription = newDescription
        updatedContact.save()
    });


    res.send("")
})
module.exports = router 