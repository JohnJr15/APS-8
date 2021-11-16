const crypto = require('./cryptoService');
const { security } = require('../../config');
const jwt = require('jsonwebtoken');
const { logger: { error: logError } } = require('./loggerService');

const generateToken = (params = {}, keys = security) => {
    try {
        const token = jwt.sign({
            params,
        }, keys.jwtPrivateKey, {
            expiresIn: keys.jwtExpirationTime,
        });

        return crypto.encrypt(token, keys.cryptoSecretKey);
    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const verify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            logError('401 - Unauthorized');
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }

        const token = crypto.decrypt(authHeader, security.cryptoSecretKey);

        jwt.verify(token, security.jwtPrivateKey, (err, decoded) => {
            if (err) {
                logError('401 - Invalid session');
                return res.status(401).json({
                    message: 'Invalid session',
                });
            }

            req.userId = decoded.params?.id;
            return next();
        });
    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    generateToken,
    verify,
};
