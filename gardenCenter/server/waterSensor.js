const mongoose      = require('mongoose');
const SoilReading   = require('../models/soilReading');
const five          = require('johnny-five');
const logger        = require('winston');


module.exports = {
    "start" :function start(){
        const board = new five.Board({
            timeout: 3600
        });

        board.on('ready', () => {
            const sensorA0 = new five.Sensor({
                id: 1,
                pin: "A0",
                freq: 10000,
                threshold: 5
            });

            sensorA0.on('data', () => {

                const newSoilReading = new SoilReading({
                    sensor_id: sensorA0.id,
                    moisture_level: sensorA0.scaleTo([0, 100]),
                    reading_date: Date.now()
                });       
                
                SoilReading.create(newSoilReading);
                logger.info(newSoilReading.toString());
                
            });
            logger.info(`Sensor ${sensorA0.pin} has started.`);
        });

        board.on('exit', () => {
            logger.info(`See ya from the sensor`);
        });
    }
};