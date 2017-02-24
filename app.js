// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express'); // Load express
const app        = express();
const mongoose   = require('mongoose'); // To interact with mongo
const bodyParser = require('body-parser'); // body-parser will handles our API calls
const config     = require('./gcConfig'); // Hide away our keys
const crypto     = require('crypto');
const encryption = require('./encryption');
const jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

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
            
            if(encryption.decrypt(user.password) != req.body.password){
                return res.json({ success: false, message: "User name or password incorrect"});
            }

        }

        const tokenForUser = { 
            userName: user.userName,
            isAdmin: user.isAdmin
        };

        // We found a user so create a token
        const token = jwt.sign( tokenForUser, config.tokenSecret, {
            expiresIn: 1440 // 24 hours (24 X 60)
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
            }

        });
    } else {

        return res.status(403).send({
            success: false,
            message: 'No token provided, please provide a valid token to continue.'
        });

    }

    next(); // make sure we go to the next route and don't stop here
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

     // Encrypt the users password
        const encryptedPassword = encryption.encrypt(req.body.password);

});

// *****************
// IoT
// *****************
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