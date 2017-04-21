const mongoose = require('mongoose');

const soilReadingSchema = mongoose.Schema({
    moisture_level: {
        type: Number,
        required: true
    },
    reading_date: {
        type: Date,
        default: Date.now()
    }
});

const SoilReading = module.exports = mongoose.model('SoilReading', soilReadingSchema, 'soilReading');