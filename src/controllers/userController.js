const userRepository = require('../repositories/userRepository');
const { logError, logInfo } = require('../services');
const {
    USER_NOT_FOUND,
    CITY_ALREADY_FAVORITE,
    FIND_USER_INVALID_PARAMETERS,
    FAVORITE_CITIES_LIMIT_REACHED,
    ADD_FAVORITE_CITY_INVALID_PARAMETERS,
    REMOVE_FAVORITE_CITY_INVALID_PARAMETERS,
} = require('../../enum');

const get = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            logError(`400 - ${FIND_USER_INVALID_PARAMETERS}`);
            return res.status(400).json({ message: FIND_USER_INVALID_PARAMETERS });
        }

        const user = await userRepository.getById(id);

        if (!user) {
            logError(`404 - ${USER_NOT_FOUND}`);
            return res.status(404).json({
                message: USER_NOT_FOUND,
            });
        }

        logInfo(`200 - User: ${user.name} found`);
        return res.status(200).json({
            id: user?.id,
            name: user?.name,
            email: user?.email,
            favoriteCities: user?.favoriteCities,
        });

    } catch (error) {
        logError(error);
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

        logInfo('200 - Get All Users');
        return res.status(200).json(result);
    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const addFavoriteCity = async (req, res) => {
    try {
        const { userId } = req;
        const { cityName, cityId } = req.body;

        const favoriteCity = { name: cityName, cityId };

        if (!cityName || !cityId) {
            logError(`400 - ${ADD_FAVORITE_CITY_INVALID_PARAMETERS}`);
            return res.status(400).json({ message: ADD_FAVORITE_CITY_INVALID_PARAMETERS });
        }

        const { favoriteCities: oldFavoriteCities } = await userRepository.getWithFilter({ _id: userId });

        if (oldFavoriteCities.length >= 5) {
            logError(`400 - ${FAVORITE_CITIES_LIMIT_REACHED}`);
            return res.status(400).json({ message: FAVORITE_CITIES_LIMIT_REACHED });
        }

        const cityAlreadyIsFavorite = oldFavoriteCities.find(city => city.cityId === cityId);

        if (cityAlreadyIsFavorite) {
            logError(`400 - ${CITY_ALREADY_FAVORITE.replace('{{cityName}}', cityName).replace('{{cityId}}', cityId)}`);
            return res.status(400).json({
                message: CITY_ALREADY_FAVORITE
                    .replace('{{cityName}}', cityName)
                    .replace('{{cityId}}', cityId),
            });
        }

        const { id, favoriteCities, name, email } = await userRepository.put(
            { _id: userId },
            { $push: { favoriteCities: favoriteCity } },
        );

        logInfo(`200 - City: ${cityName} added to the favorite cities of ${name}`);
        return res.status(200).json({ id, name, email, favoriteCities });
    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const removeFavoriteCity = async (req, res) => {
    try {
        const { userId } = req;
        const { cityId } = req.params;

        if (!cityId) {
            logError(`400 - ${REMOVE_FAVORITE_CITY_INVALID_PARAMETERS}`);
            return res.status(400).json({ message: REMOVE_FAVORITE_CITY_INVALID_PARAMETERS });
        }

        const { id, favoriteCities, name, email } = await userRepository.put(
            { _id: userId },
            { $pull: { favoriteCities: { cityId: +cityId } } },
        );

        logInfo(`200 - City: ${cityId} removed from the favorite cities of ${name}`);
        return res.status(200).json({ id, name, email, favoriteCities });
    } catch (error) {
        logError(error);
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