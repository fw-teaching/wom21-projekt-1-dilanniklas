const express = require("express")
const router = express.Router()
const Booking = require("../models/bookingsModel")
const Cabin = require("../models/cabinsModel")
const authorize = require('../middleware/authorize')

// middleware för authorisering
router.use(authorize)

// funktion för att kolla om stugan är ledig
async function checkBooking(cabin_id, startDate, endDate){
    const b = await Booking.find({cabinId: cabin_id})
    if (b.length == 0 || !b) return null
    var overBookings = []
    dateStart = new Date(startDate)
    dateEnd = new Date(endDate)
    for (i=0;i<b.length;i++)
    {
        let ds = new Date(b[i]['arrivalDate'])
        let de = new Date(b[i]['departureDate'])
        // Jag förmodar här att bokningarna alltid slutar senare än de börjar, så att man bara behöver jämföra
        // den ena periodens slutdatum med den andras startdatum för att kolla om de överlappar
        if ( !(dateEnd < ds) || (dateStart > de) )
        {
            overBookings.push({"arrivalDate" : ds, "departureDate" : de})
        }
    }
    if (overBookings.length == 0) return null
    return overBookings
}

// Skapa en bokning med POST
router.post('/:cabin_id', async (req, res) =>{
    // TODO: Kolla om tiden är ledig
    try
    {
        const bookingCheck = await checkBooking(req.params.cabin_id, req.body.arrivalDate, req.body.departureDate);
        if (bookingCheck==null)
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
        else 
        {
            console.log(bookingCheck)
            res.status(201).json(bookingCheck)
        }
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