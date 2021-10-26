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

const getWeather = async (req, res) => {
    try {
        const { latitude, longitude, cityName, cityId } = req.query;

        if ((!latitude || !longitude) && !cityName && !cityId) {
            return res.status(400).json({
                message: 'You need to inform at least one of this params to get the weather: (latitude and longitude), cityName, cityId',
            });
        }

        if (latitude && longitude) {
            const { results } = await weather.getWeatherByLatitudeAndLongitude(latitude, longitude);

            return res.status(200).json(results);
        }

        if (cityName) {
            const { results } = await weather.getWeatherByCityName(cityName);

            return res.status(200).json(results);
        }

        if (cityId) {
            const { results } = await weather.getWeatherByCityId(cityId);

            return res.status(200).json(results);
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getWeatherFavoriteCity,
    getWeather,
};