const axios = require('axios');
const { weatherService } = require('../../config');

const getWeatherByCityName = async cityName => {
    const requestConfig = {
        params: {
            key: xApiKey,
            city_name: cityName,
        },
    };

    const url = weatherService.url;

    const { data } = await axios.get(url, requestConfig);

    return data;
};

module.exports = {
    getWeatherByCityName,
};