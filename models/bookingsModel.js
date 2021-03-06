const mongoose = require('mongoose')
require("../models/cabinsModel")

const bookingsSchema = new mongoose.Schema({
    cabinId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cabins',
        required: true
    },
    renter: {
        type: String,
        required: true,
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model(
    'Bookings',
    bookingsSchema
)