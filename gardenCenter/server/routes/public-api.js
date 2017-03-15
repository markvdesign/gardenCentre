// ROUTES FOR OUR API
const express = require('express');
const publicApi = express.Router(); // get an instance of the express router.

const uuid       = require('uuid/v1'); // Use uuid() to generate a timestamped GUID
const config     = require('../gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('../encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Data Models
const User  = require('../../models/user');


// Test api to make sure everything is working
publicApi.get('/', function(req, res){
    return res.json({ message: "Welcome to Garden Centre!" });
});

publicApi.post('/login', function(req, res){
    User.findOne({
        userName: req.body.userName
    }, function(err, user){
        if(err){
            throw err;
        }

        if(!user){
             return res.json({ success: false, message: "No User: User name or password incorrect"});
        } 
        
        if (user) {
            
            if(user.password != encryption.encrypt(req.body.password)){
                return res.json({ success: false, message: "User name or password incorrect"});
            }

        }

        const tokenPayload = { 
            userName: user.userName,
            isAdmin: user.isAdmin
        };

        // We found a user so create a token
        const token = jwt.sign( tokenPayload, config.tokenSecret, {
            expiresIn: "24h" // 24 hours as JWT will take the number or seconds or strings like this "2d" or "2 days"
        });

        return res.json({
            success: true,
            message: "log in was successful.",
            gc_token: token
        });

    });
});

publicApi.get('/setup', (res, req) => {
    const markV = new User({
        userName: 'MarkV',
        password: encryption.encrypt(config.setupPassword),
        isAdmin: true
    });

    markV.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    return res.json({ success: true });
  });

});

// *****************
// Export our api to the main app
// *****************

module.exports = publicApi;