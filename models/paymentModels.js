const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "Online"],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
    },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);