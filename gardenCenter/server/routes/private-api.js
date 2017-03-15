// ROUTES FOR OUR API
const express = require('express');
const privateApi = express.Router(); // get an instance of the express router.

const uuid       = require('uuid/v1'); // Use uuid() to generate a timestamped GUID
const config     = require('../gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('../encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Data Models
const SoilReading = require('../../models/soilReading');
const User  = require('../../models/user');

// *****************
// USERS
// *****************

// (GET http://localhost:8080/api/users)
privateApi.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    return res.json(users);
  });
});

// (POST http://localhost:8080/api/user)
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


// *****************
// Export our api to the main app
// *****************

module.exports = privateApi;