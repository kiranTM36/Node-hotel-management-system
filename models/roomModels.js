const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomNumber : {
        type : String,
        required : true,
        unique: true
    },
    roomType : {
        type : String,
        enum : ['single','double','deluxe'],
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['available', 'booked'],
        required : true
    }
})

module.exports = mongoose.model("Room", roomSchema)