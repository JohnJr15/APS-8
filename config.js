const getApplicationData = () => ({
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
});

const getSecurityData = () => ({
  cryptoSecretKey: process.env.CRYPTO_PRIVATE_KEY,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  jwtExpirationTime: +process.env.JWT_EXPIRATION_TIME,
});

const getMongoData = () => ({
  uri: process.env.MONGO_URI,
});

const getWeatherServiceData = () => ({
  url: process.env.WEATHER_SERVICE_URL,
  xApiKey: process.env.WEATHER_SERVICE_X_API_KEY,
});

const getCityServiceData = () => ({
  url: process.env.CITY_SERVICE_URL,
  xApiKey: process.env.CITY_SERVICE_X_API_KEY,
});


module.exports = {
  application: getApplicationData(),
  security: getSecurityData(),
  mongo: getMongoData(),
  weatherService: getWeatherServiceData(),
  cityService: getCityServiceData(),
};