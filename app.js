// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express'); // Load express
const app        = express();
const mongoose   = require('mongoose'); // To interact with mongo
const bodyParser = require('body-parser'); // body-parser will handles our API calls
const logger     = require('winston'); // Use logger.info("info message"), logger.warn("warn msg") logger.error("error msg") or logger.log('info', "info msg")
const uuid       = require('uuid/v1'); // Use uuid() to generate a timestamped GUID

const config     = require('./gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('./encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

const sensor     = require('./waterSensor');

// Data Models
const SoilReading = require('./models/soilReading');
const User  = require('./models/users');


// Configuration
const port = process.env.PORT || 8080;
mongoose.connect(config.dbUrl); // Connect to our DB using mongoose
app.set('', config.tokenSecret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================

var apiRoutes = express.Router(); // get an instance of the express router.

// Test api to make sure everything is working
apiRoutes.get('/', function(req, res){
    res.json({ message: "Welcome to Garden Centre!" });
});

apiRoutes.post('/login', function(req, res){
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
apiRoutes.use(function(req, res, next) {
    
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
// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
//=====================================

app.use('/api', apiRoutes);

// *****************
// USERS
// *****************

// (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// (POST http://localhost:8080/api/user)
apiRoutes.post('/user', (req, res) => {

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
sensor.start();