const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Cabin = require("../models/cabinsModel")
const authorize = require('../middleware/authorize')

require('dotenv').config()

// middleware för authorisering
router.use(authorize)

//Middleware för att få enskilt cabin med id
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
<<<<<<< HEAD
            renter: req.authUser.email,
=======
            owner: req.authUser.email,
>>>>>>> dilan
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

//Raderar 
router.delete('/:id', getCabinById, async (req, res)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]   //splittar för att få bort Bearer

    const authUser = jwt.verify(token, process.env.JWT_SECRET) //får den inloggades email ( authUser.email )
    const cabinEmail = await Cabin.findOne({ _id: req.params.id }).exec() //får email från vem posten är skapad av 

<<<<<<< HEAD
    if(authUser.email == cabinEmail.renter  ) { //jämför om emailen är likadana 
=======
    if(authUser.email == cabinEmail.owner ) { //jämför om emailen är likadana 
>>>>>>> dilan

        await Cabin.deleteOne({_id: req.params.id }).exec()  // radera om det är samma email
        res.json({message: "Cabin deleted!"}) 

    } else {
<<<<<<< HEAD
        res.status(500).send({auth:false, message:'Not allowed to delete others posts'})
=======
        res.status(500).send({message:'Not allowed to delete others posts'})
>>>>>>> dilan
    }
})  

//Ändrar med put 
router.put('/:id', getCabinById, async (req, res) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    const authUser = jwt.verify(token, process.env.JWT_SECRET)   //får den inloggades email
    const cabinEmail = await Cabin.findOne({ _id: req.params.id }).exec()   //får email från vem posten är skapad av 

<<<<<<< HEAD
    if(authUser.email == cabinEmail.renter  ) {
=======
    if(authUser.email == cabinEmail.owner  ) {
>>>>>>> dilan
        const updatedCabin = await req.cabin.updateOne(req.body).exec()
  
        res.json({message: "Cabin updated!", modified: updatedCabin.modifiedCount}) 
    } else {
<<<<<<< HEAD
        res.status(500).send({auth:false, message:'Not allowed to edit others posts'})
=======
        res.status(500).send({message:'Not allowed to edit others posts'})
>>>>>>> dilan
    }
    
})

//Ändrar med patch
router.patch('/:id', getCabinById, async (req, res) =>{
    const authHeader = req.headers['authorization']   
    const token = authHeader?.split(' ')[1]  

    const authUser = jwt.verify(token, process.env.JWT_SECRET)   //får den inloggades email
    const cabinEmail = await Cabin.findOne({ _id: req.params.id }).exec()   //får email från vem posten är skapad av 

<<<<<<< HEAD
    if(authUser.email == cabinEmail.renter  ) {
=======
    if(authUser.email == cabinEmail.owner  ) {
>>>>>>> dilan
        const updatedCabin = await req.cabin.updateOne(req.body).exec()
  
        res.json({message: "Cabin updated!", modified: updatedCabin.modifiedCount}) 
    } else {
<<<<<<< HEAD
        res.status(500).send({auth:false, message:'Not allowed to edit others posts'})
=======
        res.status(500).send({message:'Not allowed to edit others posts'})
>>>>>>> dilan
    }
    
})

module.exports = router