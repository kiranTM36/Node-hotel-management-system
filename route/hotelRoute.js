const express = require('express')
const hotelModel = require('../models/hotelModels')
const router = express.Router()

// POST route to create hotel (only if not exists)
router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newHotel = new hotelModel(data)
        const response = await newHotel.save()

        res.status(200).json(response)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
})

module.exports = router