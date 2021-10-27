const axios = require('axios');
const { cityService } = require('../../config');

const makeRequest = async requestConfig => {
    const url = cityService.url;

    const { data } = await axios.get(url, requestConfig);

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