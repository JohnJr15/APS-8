const { logInfo } = require('../services');

const logRequestData = (req, res, next) => {
    logInfo({
        message: `Request from Host: ${req.headers?.host} | Application: ${req.headers?.application}`,
        breakLine: '\n',
    });

    return next();
};

module.exports = logRequestData;