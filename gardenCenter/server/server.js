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
const api = require('../server/routes/api');


// Configuration
const port = process.env.PORT || 8080;
mongoose.connect(config.dbUrl); // Connect to our DB using mongoose
app.set('', config.tokenSecret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Get out API Routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// *****************
// IoT
// *****************
app.get('/api/getsoilreading', function(req, res){
    res.json(SoilReading.getReading());
});


// START THE SERVER
// =============================================================================
app.listen(port); // Listen on the port number we set above
logger.info(`The magic happens on port ${port}`);

// Start our Water sensor
// sensor.start();