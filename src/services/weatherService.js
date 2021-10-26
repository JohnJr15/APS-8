const axios = require('axios');
const { weatherService } = require('../../config');

const makeRequest = async requestConfig => {
    const url = weatherService.url;

    const { data } = await axios.get(url, requestConfig);

    return data;
};

const getWeatherByCityName = async cityName => {
    const requestConfig = {
        params: {
            key: weatherService.xApiKey,
            city_name: cityName,
        },
    };

    return makeRequest(requestConfig);
};

const getWeatherByLatitudeAndLongitude = async (latitude, longitude) => {
    const requestConfig = {
        params: {
            key: weatherService.xApiKey,
            lat: latitude,
            lon: longitude,
        },
    };

    return makeRequest(requestConfig);
};

const getWeatherByCityId = async cityId => {
    const requestConfig = {
        params: {
            key: weatherService.xApiKey,
            woeid: cityId,
        },
    };

    return makeRequest(requestConfig);
};

module.exports = {
    getWeatherByCityName,
    getWeatherByLatitudeAndLongitude,
    getWeatherByCityId,
};