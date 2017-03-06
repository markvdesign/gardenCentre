// Our user model for sign in.
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
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