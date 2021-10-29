const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const weatherController = require('../controllers/weatherController');
const cityController = require('../controllers/cityController');
const { jwt: authService } = require('../services');
const { logRequestData } = require('../utils');

//user
router.get('/user/:id', logRequestData, authService.verify, userController.get);
router.get('/users', logRequestData, authService.verify, userController.getAll);
router.patch('/users/favorite-city', logRequestData, authService.verify, userController.addFavoriteCity);
router.delete('/users/favorite-city/:cityId', logRequestData, authService.verify, userController.removeFavoriteCity);

// weather
router.get('/weather', logRequestData, weatherController.getWeather);
router.get('/user/favorite-city/weather', logRequestData, authService.verify, weatherController.getWeatherFavoriteCity);

// city
router.get('/cities/city', logRequestData, cityController.getCityIdFromCityName);

//auth
router.post('/auth/signup', logRequestData, authController.signUp);
router.post('/auth/signin', logRequestData, authController.signIn);

module.exports = router;