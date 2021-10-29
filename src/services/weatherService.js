const axios = require('axios');
const { logger: { info: logInfo } } = require('./loggerService');
const { weatherService } = require('../../config');

const splitStringByCapitalLetters = s => {
    if (typeof s !== 'string') return '';
    return s.split(/(?=[A-Z]+[^A-Z]?)/);
};

const capitalizeFirstLetter = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const getFunctionDescription = functionName => capitalizeFirstLetter(splitStringByCapitalLetters(functionName).join(' '));

const getQuerystringFromObject = obj => Object.keys(obj)
    .filter(key => key !== 'key')
    .map(key => `${key}=${obj[key]}`)
    .join('&');

const makeRequest = async (requestConfig, functionName) => {
    const url = weatherService.url;

    const querystring = getQuerystringFromObject(requestConfig.params);
    logInfo(`Calling weather external api: ${url}?${querystring}...`);

    const { data } = await axios.get(url, requestConfig);

    logInfo(`${getFunctionDescription(functionName)} operation was executed successfully`);

    return data;
};

const getWeatherByCityName = async cityName => {
    const requestConfig = {
        params: {
            key: weatherService.xApiKey,
            city_name: cityName,
        },
    };

    return makeRequest(requestConfig, 'getWeatherByCityName');
};

const getWeatherByLatitudeAndLongitude = async (latitude, longitude) => {
    const requestConfig = {
        params: {
            key: weatherService.xApiKey,
            lat: latitude,
            lon: longitude,
        },
    };

    return makeRequest(requestConfig, 'getWeatherByLatitudeAndLongitude');
};

const getWeatherByCityId = async cityId => {
    const requestConfig = {
        params: {
            key: weatherService.xApiKey,
            woeid: cityId,
        },
    };

    return makeRequest(requestConfig, 'getWeatherByCityId');
};

module.exports = {
    getWeatherByCityName,
    getWeatherByLatitudeAndLongitude,
    getWeatherByCityId,
};