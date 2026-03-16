const express = require('express')
const db = require('./db')

//schema Call
const bookingModel = require('./models/bookingModels')
const customerModel = require('./models/customerSchema')
const hotelModel = require('./models/hotelModels')
const paymentModel = require('./models/paymentModels')
const roomModel = require('./models/roomModels')


//Routes call
const roomRoute = require('./route/roomRoute')

const app = express()
app.use(express.json())


app.get('/',(req, res) => {
    res.send('welcome')
})

 app.use('/room',roomRoute)

const PORT = 10000
app.listen(PORT, ()=> {
    console.log("Project started....");
})