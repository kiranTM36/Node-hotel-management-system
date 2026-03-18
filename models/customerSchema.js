const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true 
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

customerSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

module.exports = mongoose.model("Customer", customerSchema)