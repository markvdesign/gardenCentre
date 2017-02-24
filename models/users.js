// Our user model for sign in.
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

const Users = module.exports = mongoose.model('Users', userSchema);

// Get Soil Readings
// module.exports.getReadings = function(callback, limit){
//     Users.find(callback).limit(limit);
// };