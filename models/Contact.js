const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    contactDescription: {
        type: String
    },
    contactImage:{
        type:String
    }
})

const Contact = mongoose.model("Contact",contactSchema)
module.exports=Contact