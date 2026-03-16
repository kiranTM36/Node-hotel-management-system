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
const customerRoute = require('./route/customerRoute')
const bookingRoute = require('./route/bookingRoute')

const app = express()
app.use(express.json())


app.get('/',(req, res) => {
    res.send('welcome')
})

 //app.use('/room',roomRoute)
 app.use('/customer',customerRoute)
 app.use('/booking',bookingRoute)

const PORT = 10000
app.listen(PORT, ()=> {
    console.log("Project started....");
})