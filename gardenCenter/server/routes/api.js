// ROUTES FOR OUR API
const express = require('express');
const api = express.Router(); // get an instance of the express router.

const uuid       = require('uuid/v1'); // Use uuid() to generate a timestamped GUID
const config     = require('../gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('../encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

// Data Models
const SoilReading = require('../../models/soilReading');
const User  = require('../../models/users');


// Test api to make sure everything is working
api.get('/', function(req, res){
    res.json({ message: "Welcome to Garden Centre!" });
});

api.post('/login', function(req, res){
    User.findOne({
        userName: req.body.userName
    }, function(err, user){
        if(err){
            throw err;
        }
        
        if(!user){
             return res.json({ success: false, message: "User name or password incorrect"});
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

        res.json({
            success: true,
            message: "log in was successful.",
            gc_token: token
        });

    });
});

// apiRoutes.get('/setup', (res, req) => {
//     const markV = new User({
//         userName: 'MarkV',
//         password: encryption.encrypt(config.setupPassword),
//         isAdmin: true
//     });

//     markV.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully');
//     res.json({ success: true });
//   });

// });


// ====================================
// middleware to use for all requests
//=====================================
api.use(function(req, res, next) {
    
    // USING TOKEN BASED AUTHENTICATION
    const userToken = req.body.gc_token || req.query.gc_token || req.headers['x-gc-token'];

    if(userToken){
        jwt.verify(userToken, config.tokenSecret, function(err, decoded){

            if(err){
                return res.json({
                    success: false,
                    message: "Invalid token"
                });
            } else {
                req.decoded = decoded;
                next();
            }

        });
    } else {

        return res.status(403).send({
            success: false,
            message: 'No token provided, please provide a valid token to continue.'
        });

    }
});

// *****************
// USERS
// *****************

// (GET http://localhost:8080/api/users)
api.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// (POST http://localhost:8080/api/user)
api.post('/user', (req, res) => {

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

        res.status(204).send({success: true, message: "User successfully created."});
    });

});


// *****************
// Export our api to the main app
// *****************

module.exports = api;