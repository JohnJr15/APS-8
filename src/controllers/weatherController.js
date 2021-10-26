const { weather } = require('../services');
const userRepository = require('../repositories/userRepository');

const getResultsFromWeathersArray = weathers => weathers.map(weather => weather.results);

const getWeatherFavoriteCity = async (req, res) => {
    try {
        const { userId } = req;
        const { favoriteCities } = await userRepository.getWithFilter({ _id: userId });

        if (!favoriteCities) {
            return res.status(400).json({
                message: 'User do not have favorite cities yet!',
            });
        }

        const weatherFavoriteCities = await Promise.all(
            favoriteCities.map(async city => await weather.getWeatherByCityId(city.cityId)),
        );

        const weatherResultsFavoriteCities = getResultsFromWeathersArray(weatherFavoriteCities);

        return res.status(200).json(weatherResultsFavoriteCities);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getWeatherFavoriteCity,
};