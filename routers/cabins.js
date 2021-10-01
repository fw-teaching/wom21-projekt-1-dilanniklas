const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Cabin = require("../models/cabinsModel")
const Booking = require("../models/bookingsModel")
const authorize = require('../middleware/authorize')

// middleware för authorisering
router.use(authorize)

const getCabinById = async (req, res, next) => {

    const cabin = await Cabin.findOne({ _id: req.params.id }).exec()
    if(!cabin) return res.status(404).json({message: "Cabin not found!"})

    req.cabin = cabin //ett monguus objekt
    next()
}

// Skapa en annons med POST
router.post('/', async (req, res) =>{

    try
    {
        const cabin = new Cabin({
            renter: req.authUser.email,
            address: req.body.address,
            size: req.body.size,
            sauna: req.body.sauna,     
            beach: req.body.beach,
            price: req.body.price
        })
        const newCabin = await cabin.save()

        res.status(201).send(newCabin)
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
        const cabins = await Cabin.find()

        res.status(201).send(cabins)
    }
    catch (error)
    {
        res.status(500).json({message: error.message})
    }
})

//PUT ändrar på någonting
router.put('/:id', getCabinById, async (req, res) => { 
    try {
        const updatedCabin = await req.cabin.updateOne(req.body).exec()
  
        res.json({message: "Cabin updated!", modified: updatedCabin.modifiedCount}) 

    } catch (error) {
        res.status(500).send(error.message)
    }
})

//Raderar 
router.delete('/:id', getCabinById, async (req, res)=> {
    try {
        await Cabin.deleteOne({_id: req.params.id }).exec()
        res.json({message: "Cabin deleted!"})

    } catch (error) {
        res.status(500).send(error.message)
    }
})   

module.exports = router