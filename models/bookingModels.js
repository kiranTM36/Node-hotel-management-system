const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    roomNumber : {
        type : String,
        required : true
    },
    customerId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
        required : true
    },
    checkIn :{
        type : Date,
        required : true
    } ,
    checkOut : {
        type : Date,
        required : true
    } ,
    status : {
        enum : ['booked','cancelled','checkIn','checkOut'],
        type : String,
        required : true
    },
},
({timestamps : true})
)

module.exports = mongoose.model("Booking", bookingSchema)