const express = require('express')
const customerModel = require('../models/customerSchema')
const bcrypt = require('bcrypt')

const router = express.Router()

//get all Customer data
router.get('/' ,async (req, res) => {
    try {
        const response = await customerModel.find();
        console.log("Data fetch")
        res.status(201).json(response)
            
    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})
//get customer by name
router.get('/name/:name' ,async (req, res) => {
    try {
        const name = req.params.name
        const response = await customerModel.find({name : name});

        if(response.length === 0){
            return res.json("No user found")
        }
        console.log("Data fetch")
        res.status(201).json(response)
            
    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})
//customer login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await customerModel.findOne({ email });
        if (!existingUser) return res.send("No user Found");

        const isMatchPass = await bcrypt.compare(password, existingUser.password);
        if (!isMatchPass) return res.send("Invalid Password");

        // Save user ID in session
        req.session.userId = existingUser._id;

        res.redirect('/profile'); // redirect to profile
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

//create Customer 
router.post('/signin',async (req, res) => {
    try {
        const data = req.body
        const newCustomer = new customerModel(data)
        const response = await newCustomer.save()

        console.log("Data uploaded")
        return res.status(201).json(response)   

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

//delete customer
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await customerModel.findByIdAndDelete(id)

        if(!response){
             console.log("No use Found")
            return res.status(201).send("No Customer")
        }
    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

//update customer data
router.put('/name/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const response = await customerModel.findByIdAndUpdate(id, data, {
            new : true,
            runValidators : true
        })

        if(!response){
             console.log("No use Found")
            return res.status(201).send("No Customer")
        }
    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Error')
    }
})

module.exports = router