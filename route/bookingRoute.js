const express = require('express')

const bookingModel = require('./../models/bookingModels')
const customerModel = require('./../models/customerSchema')
const roomModel = require('./../models/roomModels')

const router = express.Router()

//Booking a Room
router.post('/', async (req, res) => {
    try {
        const { roomNumber, customerId, checkIn, checkOut } = req.body

        if (!roomNumber || !customerId || !checkIn || !checkOut) {
            return res.status(400).json("Please fill all fields")
        }

        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.status(400).send("CheckOut must be after CheckIn")
        }

        const customer = await customerModel.findById(customerId)
        if (!customer) {
            return res.status(404).json("Customer Id not available")
        }

        const room = await roomModel.findOne({ roomNumber })
        if (!room) {
            return res.status(404).json("No such room")
        }
        const existingBooking = await bookingModel.findOne({
            roomNumber: roomNumber,
            status: { $ne: "cancelled" },
            checkIn: { $lt: new Date(checkOut) },
            checkOut: { $gt: new Date(checkIn) }
        })

        if (existingBooking) {
            return res.status(400).send("Room already booked for selected dates")
        }

        const newBooking = new bookingModel({
            roomNumber,
            customerId,
            checkIn,
            checkOut,
            status: "booked"
        })

        const response = await newBooking.save()

        res.status(201).json({
            message: "Booking successful",
            booking: response
        })

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})

//Read Booked room
router.get('/',async(req, res) => {

    try {
        const response = await bookingModel.find()
        console.log("Data Fetch")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error")
    }
})
module.exports = router