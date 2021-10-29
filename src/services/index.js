const crypto = require('./cryptoService');
const jwt = require('./jwtService');
const weather = require('./weatherService');
const city = require('./cityService');
const { logger: { info, error } } = require('./loggerService');

module.exports = {
    crypto,
    jwt,
    weather,
    city,
    logInfo: info,
    logError: error,
};
