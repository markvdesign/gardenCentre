// server.js

// BASE SETUP
// =============================================================================

// call the packages we need

const express = require('express'); // Load express
const app = express();
const mongoose = require('mongoose'); // To interact with mongo
const bodyParser = require('body-parser'); // body-parser will handles our API calls
const config = require('./config');

// Data Models
SoilReading = require('./models/soilReading');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router(); // get an instance of the express router.

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    
    if(req.headers.apikey !== config.appKey){
        res.statusCode = 403;
        res.json( { error: "unauthorised"});
    }

    next(); // make sure we go to the next routes and don't stop here
});

// Connect to our DB using mongoose
mongoose.connect(config.dbUrl);
const db = mongoose.connection;

// Test api to make sure everything is working
router.get('/', function(req, res){
    res.json({ message: "Welcome to Garden Centre!" });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/api/getsoilreadings', function(req, res){
    SoilReading.getReadings(function(err, readings){
        if(err){
            throw err;
        }
        res.json(readings);
    });
});


// START THE SERVER
// =============================================================================
app.listen(port); // Listen on the port number we set above
console.log(`The magic happens on port ${port}`);