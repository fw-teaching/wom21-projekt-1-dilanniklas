const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Booking = require("../models/bookingsModel")
const Cabin = require("../models/cabinsModel")
const authorize = require('../middleware/authorize')

require('dotenv').config() //läser in env filen för att få JWT_SECRET

// middleware för authorisering
router.use(authorize)

//Middleware för att få enskilt booking med id
const getBookingById = async (req, res, next) => {

    const booking = await Booking.findOne({ _id: req.params.id }).exec()
    if(!booking) return res.status(404).json({message: "Booking not found!"})

    req.booking = booking //ett monguus objekt
    next() 
}


// Skapa en bokning med POST
router.post('/:cabin_id', async (req, res) =>{
    
    try
    {
        const booking = new Booking({
            "cabinId": req.params.cabin_id,
            "renter": req.authUser.email,
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

// Hämta alla bokningar
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

//Radera en bokning
router.delete('/:id', getBookingById, async (req, res) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]  

    const authUser = jwt.verify(token, process.env.JWT_SECRET) 
    const bookingEmail = await Booking.findOne({ _id: req.params.id }).exec() 

    if(authUser.email == bookingEmail.renter) { 

        await Booking.deleteOne({_id: req.params.id }).exec()  
        res.json({message: "You cancelled your booking!"}) 

    } else {
        res.status(500).send({message:'You cannot cancel someone elses booking!'})
    }
})

//Ändra sin bokning
router.put('/:id', getBookingById, async (req, res) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]  

    const authUser = jwt.verify(token, process.env.JWT_SECRET) 
    const bookingEmail = await Booking.findOne({ _id: req.params.id }).exec() 

    if(authUser.email == bookingEmail.renter) { 

        const updatedBooking = await req.booking.updateOne(req.body).exec()
        res.json({message: "Booking updated!", modified: updatedBooking.modifiedCount}) 

    } else {
        res.status(500).send({message:'You cannot modify someone elses booking!'})
    }
})

module.exports = router

