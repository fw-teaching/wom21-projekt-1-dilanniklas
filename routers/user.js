const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/usersModel")   //behöver register data modellen

console.log("Register läses in")

//Skapa en användare mha POST
router.post('/', async (req, res) =>{

    const hashedPassword = await bcrypt.hash(req.body.password, 12)   //tar password från bodyn och hashar det

    try {
        const user = new User({  //tar namn,efternamn,emailen från bodyn från REST_clienten
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,     
            password: hashedPassword
        })

        const newUser = await user.save()
        res.status(201).send(newUser)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})





module.exports = router