// Nodejs encryption with CTR

const crypto = require('crypto');
const appConfig = require('./gcConfig');
const algorithm = 'aes-256-ctr';

module.exports = {
    encrypt : function(text){
        const cipher = crypto.createCipher(algorithm, appConfig.encryptPassword);
        let crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt : function (text){
        const decipher = crypto.createDecipher(algorithm, appConfig.encryptPassword);
        let dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    }
}