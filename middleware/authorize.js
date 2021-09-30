require('dotenv').config()   //behöver dotnev för att få vår JWT Secret 
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    console.log('authorize JWT')

    try{
        const authHeader = req.headers['authorization']

        const token = authHeader?.split(' ')[1] //få bort Bearer, så vi splittar den vid mellanslaget, nu får vi bara token

        const authUser = jwt.verify(token, process.env.JWT_SECRET) //verifierar, ser om tokenen e skapad med samma secret
        
        req.authUser = authUser    //mongoose objekt

        console.log(`Authorized ${authUser.email}`)
        next()

    } catch (error) {

        return res.json({message: error.message})
    }

}