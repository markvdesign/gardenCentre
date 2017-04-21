const mongoose      = require('mongoose');
const SoilReading   = require('../models/soilReading');
const five          = require('johnny-five');
const logger        = require('winston');


module.exports = {
    "start" :function start(){
        const board = new five.Board({
            timeout: 30
        });

        board.on('ready', () => {
            const sensor = new five.Sensor({
                pin: "A0",
                freq: 3600000,
                threshold: 5
            });

            sensor.on("data", () => {

                const newSoilReading = new SoilReading({
                    moisture_level: sensor.scaleTo(0, 100),
                    reading_date: Date.now()
                });       
                
                SoilReading.create(newSoilReading);
                logger.info(newSoilReading.toString());
                
            });
        });

        logger.info("Sensor has started.");
    }
};