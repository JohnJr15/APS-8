const userRepository = require('../repositories/userRepository');

const get = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userRepository.getById(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found!',
            });
        }

        return res.status(200).json({
            id: user?.id,
            name: user?.name,
            email: user?.email,
            favoriteCities: user?.favoriteCities,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await userRepository.get();

        const result = users.map(user => ({
            id: user?.id,
            name: user?.name,
            email: user?.email,
            favoriteCities: user?.favoriteCities,
        }));

        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const addFavoriteCity = async (req, res) => {
    try {
        const { userId } = req;
        const favoriteCity = req.body;

        const { favoriteCities: oldFavoriteCities } = await userRepository.getWithFilter({ _id: userId });

        if (oldFavoriteCities.length >= 5) {
            res.status(400).json({ message: 'You cannot add more than 5 cities to the favorites. Please remove one and try again' });
        }

        const { id, favoriteCities, name, email } = await userRepository.put(
            { _id: userId },
            { $push: { favoriteCities: favoriteCity } },
        );

        res.status(200).json({ id, name, email, favoriteCities });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const removeFavoriteCity = async (req, res) => {
    try {
        const { userId } = req;
        const { cityId } = req.params;

        const { id, favoriteCities, name, email } = await userRepository.put(
            { _id: userId },
            { $pull: { favoriteCities: { cityId: +cityId } } },
        );

        res.status(200).json({ id, name, email, favoriteCities });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    get,
    getAll,
    addFavoriteCity,
    removeFavoriteCity,
};