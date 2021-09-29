require('dotenv').config()   //läser in .env filen 
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3030

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)  
const db = mongoose.connection    //skapar databas connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))


app.use(express.json())  //API:n ska ta emot JSON-format 

// Testa att detta funkar, ersätt sedan med egen kod
app.get('/', (req, res) => {
    res.json({message: "Serverjs funkar"})
})


//Vi importerar Register route-modul 
const userRouter = require('./routers/user')
app.use('/user', userRouter)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
