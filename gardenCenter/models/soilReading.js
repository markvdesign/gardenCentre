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

const SoilReading = module.exports = mongoose.model('SoilReading', soilReadingSchema);

// Get Soil Readings
module.exports.getReadings = function(callback, limit){
    SoilReading.find(callback).limit(limit);
};