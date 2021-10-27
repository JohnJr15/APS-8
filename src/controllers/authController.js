const userRepository = require('../repositories/userRepository');
const { crypto, jwt } = require('../services');

const signUp = async (req, res) => {
    try {
        const { name: userName, email: userEmail, password: userPassword } = req.body;
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).json({ message: 'You must inform the name, email and password to create a user' });
        }

        let user = await userRepository.getByEmail(userEmail);

        if (user) return res.status(409).json({ message: 'E-mail already exists!' });

        user = req.body;
        user = await userRepository.create(user);
        user.token = jwt.generateToken({ id: user.id });
        await userRepository.put({ _id: user._id }, { $set: { token: user.token } });

        const { id, name, email, createdAt, updatedAt, token } = user;

        return res.status(201).json({
            id,
            name,
            email,
            createdAt,
            updatedAt,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'You must inform the email and password sign in' });
        }

        const user = await userRepository.getByEmail(email);

        if (!user) return res.status(404).json({ message: 'User or password incorrect!' });

        if (crypto.decrypt(user.password) !== password) {
            return res.status(401).json({ message: 'User or password incorrect!' });
        }
        user.token = jwt.generateToken(
            { id: user._id },
        );

        await userRepository.put(
            { _id: user._id },
            { $set: { token: user.token } },
        );

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
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    signUp,
    signIn,
};
