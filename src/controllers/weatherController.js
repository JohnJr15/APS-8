const { weather, logInfo, logError } = require('../services');
const userRepository = require('../repositories/userRepository');
const { USER_WITHOUT_FAVORITE_CITIES, GET_WEATHER_INVALID_PARAMETERS } = require('../../enum');

const getResultsFromWeathersArray = weathers => weathers.map(weather => weather.results);

const getCityNamesFromWeathers = weathers => weathers.map(weather => weather.city.replace(',', ' -')).join(', ');

const getWeatherFavoriteCity = async (req, res) => {
    try {
        const { userId } = req;
        const { favoriteCities } = await userRepository.getWithFilter({ _id: userId });

        if (!favoriteCities) {
            logError(`400 - ${USER_WITHOUT_FAVORITE_CITIES}`);
            return res.status(400).json({
                message: 'User do not have favorite cities yet!',
            });
        }

        const weatherFavoriteCities = await Promise.all(
            favoriteCities.map(async city => await weather.getWeatherByCityId(city.cityId)),
        );

        const weatherResultsFavoriteCities = getResultsFromWeathersArray(weatherFavoriteCities);


        logInfo(`200 - Get weather of favorite cities: ${getCityNamesFromWeathers(weatherResultsFavoriteCities)}`);
        return res.status(200).json(weatherResultsFavoriteCities);

    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getWeather = async (req, res) => {
    try {
        const { latitude, longitude, cityName, cityId } = req.query;

        if ((!latitude || !longitude) && !cityName && !cityId) {
            logError(`400 - ${GET_WEATHER_INVALID_PARAMETERS}`);
            return res.status(400).json({
                message: GET_WEATHER_INVALID_PARAMETERS,
            });
        }

        if (latitude && longitude) {
            const { results } = await weather.getWeatherByLatitudeAndLongitude(latitude, longitude);

            logInfo('200 - Get weather by latitude and longitude');
            return res.status(200).json(results);
        }

        if (cityName) {
            const { results } = await weather.getWeatherByCityName(cityName);

            logInfo(`200 - Get weather by city name: ${cityName}`);
            return res.status(200).json(results);
        }

        if (cityId) {
            const { results } = await weather.getWeatherByCityId(cityId);

            logInfo(`200 - Get weather by city id: ${cityId}`);
            return res.status(200).json(results);
        }

        return res.status(204).send();
    } catch (error) {
        logError(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getWeatherFavoriteCity,
    getWeather,
};