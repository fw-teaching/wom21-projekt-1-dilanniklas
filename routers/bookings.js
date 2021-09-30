const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Booking = require("../models/bookingsModel")
const authorize = require('../middleware/authorize')

// middleware för authorisering
router.use(authorize)

// Skapa en annons med POST
router.post('/', async (req, res) =>{

    try
    {
        const booking = new Booking({
            renter: req.body.renter,
            address: req.body.address,
            size: req.body.size,
            sauna: req.body.sauna,     
            beach: req.body.beach,
            price: req.body.price
        })

        const newBooking = await booking.save()

        res.status(201).send(newBooking)
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
})

// Hämta alla stugor
router.get('/', async (req, res) =>{

    try
    {
        const bookings = await Booking.find()


        res.status(201).send(bookings)
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
})


module.exports = router