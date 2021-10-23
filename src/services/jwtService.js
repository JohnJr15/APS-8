const crypto = require('../services/cryptoService');
const { security } = require('../../config');
const jwt = require('jsonwebtoken');

const generateToken = (params = {}, keys = security) => {
    try {
        const token = jwt.sign({
            params,
        }, keys.jwtPrivateKey, {
            expiresIn: keys.jwtExpirationTime,
        });

        return crypto.encrypt(token, keys.cryptoSecretKey);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const verify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({
                message: 'Unauthorized',
            });

        const token = crypto.decrypt(authHeader, security.cryptoSecretKey);

        jwt.verify(token, security.jwtPrivateKey, (err, decoded) => {
            if (err) return res.status(401).json({
                message: 'Invalid session',
            });

            req.userId = decoded.params?.id;
            return next();
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    generateToken,
    verify,
};
