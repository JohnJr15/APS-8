const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const { security } = require('../../config');

const encrypt = (password, key = security.cryptoSecretKey) => {
    try {
        const cipher = crypto.createCipher(algorithm, key);
        let crypted = cipher.update(password, 'utf-8', 'hex');
        crypted += cipher.final('hex');

        return crypted;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const decrypt = (password, key = security.cryptoSecretKey) => {
    try {
        const decipher = crypto.createDecipher(algorithm, key);
        let decrypted = decipher.update(password, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    encrypt,
    decrypt,
};