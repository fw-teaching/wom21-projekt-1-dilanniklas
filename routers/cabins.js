const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Cabin = require("../models/cabinsModel")
const authorize = require('../middleware/authorize')

// middleware för authorisering
router.use(authorize)

// Skapa en annons med POST
router.post('/', async (req, res) =>{

    try
    {
        const cabin = new Cabin({
            renter: req.body.renter,
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


module.exports = router