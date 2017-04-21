# Welcome to the Garden Centre!

Garden Centre is an automated watering system which uses the the Johnny-Five IoT library, Node.js, Express.js and Angular for the front end. The IoT will consist of an Arduino Nano connected to a soil moisture sensor.

## gcConfig.js
I've added a config file to get you started, I highly recommend you update all the keys prior to deploying the app to prod. 

## File Structure
GardenCenter is the base folder for the project and inside this folder there are 5 major folders
- e2e for end to end tests
- models - which holds our mongoDB models
- server - Contains **dist** where our Angular front end builds too, **routes** which holds our API routes for the back end. **encryption.js** is where our encryption helper methods are, **waterSensor.js** is where we set up our analog moisture sensor and finally **server.js** is where we set up our node server.
- src - Built using the Angular CLI this is a standard **ng new** Angular project build.


# Starting the application
1. Make sure you have Nodejs, MongoDB and the Angular CLI installed.
2. 