// ROUTES FOR OUR API
const express = require('express');
const privateApi = express.Router(); // get an instance of the express router.

const uuid       = require('uuid/v1'); // Use uuid() to generate a timestamped GUID
const config     = require('../gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('../encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Data Models
<<<<<<< HEAD
const SoilReading = require('../../models/soilReading');
const User  = require('../../models/user');
=======
const User  = require('../../models/user');
const SoilReading = require('../../models/soilReading');
>>>>>>> 8e40b3848a62251b81dbc491e5bd743e09fc163c

// *****************
// USERS
// *****************

<<<<<<< HEAD
// (GET http://localhost:8080/api/users)
=======
// (GET http://localhost:3000/api/users)
>>>>>>> 8e40b3848a62251b81dbc491e5bd743e09fc163c
privateApi.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    return res.json(users);
  });
});

<<<<<<< HEAD
// (POST http://localhost:8080/api/user)
=======
// (POST http://localhost:3000/api/user)
>>>>>>> 8e40b3848a62251b81dbc491e5bd743e09fc163c
privateApi.post('/user', (req, res) => {

    // Need to work out if user has admin permissions within their token.
    if(!req.decoded.isAdmin){
        return res.status(403).send({ 
            success: false, 
            message: 'You are not authorised to before this function'
        });
    }

    User.findOne({
        userName: req.body.userName
    }, function(err, user){
        if(err){
            throw err;
        }
        
        if(user){
             return res.json({ success: false, message: "A user with this user name already exists"});
        }

    });

    // Create the user details passed into the body and create a new user to add it to the database.
    const newUser = new User({
        userName: req.body.userName,
        password: encryption.encrypt(req.body.password),
        isAdmin: req.body.isAdmin
    });

    newUser.save(function(err) {
        if (err) throw err;

        return res.status(204).send({success: true, message: "User successfully created."});
    });

});

<<<<<<< HEAD
=======
// *****************
// IoT
// *****************

privateApi.get('/soilreadings', function (req, res) {

// Get all soil readings and sort them via date time.
  SoilReading.find((err, reading) => {
    return res.json(reading);
  }).sort({ reading_date: 'desc' });

});

privateApi.get('/lastsoilreading', function (req, res) {

// Get the last soil reading.
  SoilReading.find((err, reading) => {
    return res.json(reading);
  }).sort({ reading_date: 'desc' }).limit(1);

});

>>>>>>> 8e40b3848a62251b81dbc491e5bd743e09fc163c

// *****************
// Export our api to the main app
// *****************

module.exports = privateApi;