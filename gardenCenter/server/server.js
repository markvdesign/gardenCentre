// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express'); // Load express
const app        = express();
const path       = require('path');
const mongoose   = require('mongoose'); // To interact with mongo
const bodyParser = require('body-parser'); // body-parser will handles our API calls
const logger     = require('winston'); // Use logger.info("info message"), logger.warn("warn msg") logger.error("error msg") or logger.log('info', "info msg")
const uuid       = require('uuid/v1'); // Use uuid() to generate a timestamped GUID

const config     = require('./gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('./encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

const sensor     = require('./waterSensor');

// API Routes
const publicApi  = require('../server/routes/public-api');
const privateApi = require('../server/routes/private-api');


// Configuration
const port = process.env.PORT || 8080;
mongoose.connect(config.dbUrl); // Connect to our DB using mongoose
app.set('', config.tokenSecret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// ====================================
// Public API routes
//=====================================
app.use('/api', publicApi);

// ====================================
// middleware to use for all requests
//=====================================
privateApi.use(function(req, res, next) {
    
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

// ====================================
// Private API routes
//=====================================s
app.use('/api', privateApi);


// *****************
// IoT
// *****************
app.get('/api/getsoilreading', function(req, res){
    return res.json(SoilReading.getReading());
});


// Catch all other routes and return the index file. This needs to be last in the list otherwise 
// you wont be able to hit any endpoints placed under this.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// START THE SERVER
// =============================================================================
app.listen(port); // Listen on the port number we set above
logger.info(`The magic happens on port ${port}`);

// Start our Water sensor
sensor.start();