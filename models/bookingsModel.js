const mongoose = require('mongoose')
require("../models/cabinsModel")

const bookingsSchema = new mongoose.Schema({
    cabinId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Advertise',
        required: true
    },
    lodger: {
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
    'Book',
    bookingsSchema
)
