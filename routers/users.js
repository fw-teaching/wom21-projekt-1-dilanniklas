const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/usersModel")   //behöver register data modellen

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
        res.status(500).json({message: "Please provide another email!"})
    }
})

router.post('/login', async (req, res) =>{
    try {
        //hitta User 
        const user = await User.findOne({ email: req.body.email }).exec() 
        //om de inte finns sådan USER så returnera detta meddelande
        if(!user) return res.status(400).json({ message: "No such user" })

        //jämför lösenorden
        const match = await bcrypt.compare(req.body.password, user.password) 
        
        //om lösenorden matchar 
        if (match) { 

             //skapar jwtBodyn av id och email
            const jwtBody = { 
                sub: user._id,
                email: user.email
            }

           //signerar med den hemliga nyckeln JWT_SECRET --> skapar Signature
            const accessToken = await jwt.sign(  
                jwtBody,   //payload
                process.env.JWT_SECRET,  //nyckeln
                {expiresIn: '30d'}
            )

            return res.status(201).send({accessToken: accessToken})
        }
       
         res.status(201).send('No such user!')

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})





module.exports = router