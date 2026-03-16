const express = require('express')
const roomModels = require('../models/roomModels')

const router = express.Router()

//Read all rooms
router.get('/',async (req, res) => {
    try {

        const response = await roomModels.find()
        console.log("Data fetch")
        res.status(201).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

//Read Room by status
router.get('/status/:condition',async (req, res) => {
    try {
        const condition = req.params.condition
        const response = await roomModels.find({status : condition})
        console.log("Data fetch")
        res.status(201).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

//Read Room by RoomTypes
router.get('/roomtype/:condition',async (req, res) => {
    try {
        const condition = req.params.condition
        const response = await roomModels.find({roomType : condition})
        console.log("Data fetch")
        res.status(201).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})


//Create new Rooms
router.post('/',async (req, res) => {
    try {
        const data = req.body
        const newRoom = new roomModels(data)
        const response = await newRoom.save()

        console.log("Data Updated Sucessfully")
        res.status(201).json(response)
    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

//Update Room by Id
router.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const response = await roomModels.findByIdAndUpdate(id, data, {
            new : true,
            runValidators : true
        })

        if(!response)
            return res.status(201).send("No Such room")

        console.log("Room Update Sucessfully")
        res.status(201).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

//Delete Room by Id
router.delete('/:id',async (req, res) =>{
    try {
        const id = req.params.id
         const response = await roomModels.findByIdAndDelete(id)

         if(!response)
            return res.status(201).send("No Such room")

         console.log("Room Delete Sucessfully")
        res.status(201).json(response)
    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

module.exports = router