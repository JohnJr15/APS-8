const axios = require('axios');
const { cityService } = require('../../config');
const { logger: { info: logInfo } } = require('./loggerService');

const getQuerystringFromObject = obj => Object.keys(obj)
    .filter(key => key !== 'key')
    .map(key => `${key}=${obj[key]}`)
    .join('&');


const makeRequest = async requestConfig => {
    const url = cityService.url;

    const querystring = getQuerystringFromObject(requestConfig.params);
    logInfo(`Calling weather external api: ${url}?${querystring}...`);

    const { data } = await axios.get(url, requestConfig);

    logInfo('Get City Id From City Name operation was executed successfully');

    return data;
};

const getCityIdFromCityName = async cityName => {
    const requestConfig = {
        params: {
            key: cityService.xApiKey,
            city_name: cityName,
        },
    };

    return makeRequest(requestConfig);
};

module.exports = {
    getCityIdFromCityName,
};