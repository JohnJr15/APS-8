const { city } = require('../services');

const getCityIdFromCityName = async (req, res) => {
    try {
        const { cityName } = req.query;

        const result = await city.getCityIdFromCityName(cityName);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getCityIdFromCityName,
};