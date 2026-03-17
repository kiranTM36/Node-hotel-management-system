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
const hotelRoute = require('./route/hotelRoute')

const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.set('view engine','ejs')
app.use(express.static('public/css'))

app.use(async (req, res, next) => {
    const hotel = await hotelModel.findOne()
    res.locals.hotel = hotel 
    next()
})

 app.get('/',async(req, res) => {
    res.render('home',)
})

app.get('/signin', (req, res) => {
    res.render('auth/signin')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

 app.use('/room',roomRoute)
 app.use('/customer',customerRoute)
 app.use('/booking',bookingRoute)
 app.use('/hotel',hotelRoute)


const PORT = 10000
app.listen(PORT, ()=> {
    console.log("Project started....");
})