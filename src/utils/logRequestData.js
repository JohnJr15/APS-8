const { logInfo } = require('../services');

const logRequestData = (req, res, next) => {
    logInfo({
        message: `Request from Host: ${req.headers?.host} | Agent: ${req.headers?.['user-agent']}`,
        breakLine: '\n',
    });

    return next();
};

module.exports = logRequestData;