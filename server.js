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

//Importerar route-moduler:
const userRouter = require('./routers/users')
app.use('/users', userRouter)

const cabinsRouter = require('./routers/cabins')
app.use('/cabins', cabinsRouter)

const bookingsRouter = require('./routers/bookings')
app.use('/bookings', bookingsRouter)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
