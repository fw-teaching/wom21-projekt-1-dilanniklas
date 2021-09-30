const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Booking = require("../models/bookingsModel")
const Cabin = require("../models/cabinsModel")
const authorize = require('../middleware/authorize')

// middleware för authorisering
router.use(authorize)

// Skapa en bokning med POST
router.post('/:cabin_id', async (req, res) =>{
    
    try
    {
        const booking = new Booking({
            "cabinId": req.params.cabin_id,
            "lodger": req.authUser.email,
            "arrivalDate": req.body.arrivalDate,
            "departureDate": req.body.departureDate
        })

        const newBooking = await booking.save()

        res.status(201).send(newBooking)
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
})

// Hämta en bokning
router.get('/:booking_id', async (req, res) =>{

    try
    {
        

        res.status(201).send(bookings)
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
})


module.exports = router