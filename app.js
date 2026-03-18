// app.js
const express = require('express')
const db = require('./db') // your MongoDB connection
const session = require('express-session')
const bcrypt = require('bcrypt')

// Schema imports
const customerModel = require('./models/customerSchema')
const hotelModel = require('./models/hotelModels')
const roomRoute = require('./route/roomRoute')
const customerRoute = require('./route/customerRoute')
const bookingRoute = require('./route/bookingRoute')
const hotelRoute = require('./route/hotelRoute')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public/css'))

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}))


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Make hotel available in all EJS
app.use(async (req, res, next) => {
    const hotel = await hotelModel.findOne()
    res.locals.hotel = hotel
    next()
})


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/signin', (req, res) => {
    res.render('auth/signin')
})

app.get('/login', (req, res) => {
    res.render('auth/login')
})

app.get('/room', (req, res) => res.render('pages/room'))
app.get('/booking', (req, res) => res.render('pages/booking'))

app.get('/profile', async (req, res) => {
    try {
        const userId = req.session.userId
        if (!userId) return res.redirect('/login')

        const user = await customerModel.findById(userId).lean()
        res.render('pages/profile', { user })
    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out")
        res.redirect('/login')
    })
})

app.use('/room', roomRoute)
app.use('/customer', customerRoute)
app.use('/booking', bookingRoute)
app.use('/hotel', hotelRoute)

const PORT = 10000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))