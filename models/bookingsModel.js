const mongoose = require('mongoose')

const bookingsSchema = new mongoose.Schema({
    lodger: {
        type: String,
        required: true,
    },
    cabin: {
        type: Number,
        required: true
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
