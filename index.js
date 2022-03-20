const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const app = express()

// const ContactModel = require("./models/Contact")

app.use(express.json())
app.use(cors())
const db = "mongodb+srv://talel:password987654321@contacts.ty1zi.mongodb.net/contact-app?retryWrites=true&w=majority"
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
}, (err) => {
    if (err) throw err
    console.log('Data Base Connected .....')
})  
  
app.use('/contact',require("./routes/contact"))
// app.post("/insert", async (req, res) => {
//     const contact = new ContactModel({ contactName: req.body.contactName, contactNumber: req.body.contactNumber, contactDescription: req.body.contactDescription });

//     try {
//         await contact.save()
//         res.send("inserted data .")
//     }
//     catch (err) {
//         console.log(err)
//     }
// })

app.listen(3001, () => {
    console.log('Server running on port 3001...')
})