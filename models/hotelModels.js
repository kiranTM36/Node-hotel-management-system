const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    stars: {
        type : Number,
        max: 5,
        min:  1,
    },
})

module.exports = mongoose.model("Hotel", hotelSchema)