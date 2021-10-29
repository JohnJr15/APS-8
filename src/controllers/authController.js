const { v4: uuidV4 } = require('uuid');

const userRepository = require('../repositories/userRepository');
const { crypto, jwt, logError, logInfo } = require('../services');
const {
    EMAIL_ALREADY_EXISTS,
    USER_OR_PASSWORD_INCORRECT,
    SIGN_UP_INVALID_PARAMETERS,
    SIGN_IN_INVALID_PARAMETERS,
} = require('../../enum');

const signUp = async (req, res) => {
    try {
        const { name: userName, email: userEmail, password: userPassword } = req.body;

        if (!userName || !userEmail || !userPassword) {
            logError(`400 - ${SIGN_UP_INVALID_PARAMETERS}`);
            return res.status(400).json({ message: SIGN_UP_INVALID_PARAMETERS });
        }

        const userAlreadyExists = await userRepository.getByEmail(userEmail);

        if (userAlreadyExists) {
            logError(`409 - ${EMAIL_ALREADY_EXISTS}`);
            return res.status(409).json({ message: EMAIL_ALREADY_EXISTS });
        }

        const userId = uuidV4();
        const userToken = jwt.generateToken({ id: userId });

        const user = await userRepository.create({
            id: userId,
            name: userName,
            email: userEmail,
            password: userPassword,
            token: userToken,
        });

        const { id, name, email, createdAt, updatedAt, token } = user;

        logInfo(`201 - User: ${name} created succesfully!`);

        return res.status(201).json({
            id,
            name,
            email,
            createdAt,
            updatedAt,
            token,
        });

    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            logError(`400 - ${SIGN_IN_INVALID_PARAMETERS}`);
            return res.status(400).json({ message: SIGN_IN_INVALID_PARAMETERS });
        }

        const user = await userRepository.getByEmail(email);

        if (!user) {
            logError(`401 - ${USER_OR_PASSWORD_INCORRECT}`);
            return res.status(401).json({ message: USER_OR_PASSWORD_INCORRECT });
        }

        if (crypto.decrypt(user.password) !== password) {
            logError(`401 - ${USER_OR_PASSWORD_INCORRECT}`);
            return res.status(401).json({ message: USER_OR_PASSWORD_INCORRECT });
        }
        user.token = jwt.generateToken(
            { id: user._id },
        );

        await userRepository.put(
            { _id: user._id },
            { $set: { token: user.token } },
        );

        logInfo(`200 - User: ${user.name} logged in successfully!`);

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            ultimo_login: user.ultimoLogin,
            token: user.token,
        });

    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    signUp,
    signIn,
};
