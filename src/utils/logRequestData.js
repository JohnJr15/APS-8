const { logInfo } = require('../services');

const logRequestData = (req, res, next) => {
    logInfo(`Request from Host: ${req.headers?.host} | Agent: ${req.headers?.['user-agent']}`);

    return next();
};

module.exports = logRequestData;