const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const weatherController = require('../controllers/weatherController');
const authService = require('../services/jwtService');

//user
router.get('/user/:id', authService.verify, userController.get);
router.get('/users', authService.verify, userController.getAll);
router.post('/users/favorite-city', authService.verify, userController.addFavoriteCity);
router.delete('/users/favorite-city/:cityId', authService.verify, userController.removeFavoriteCity);

// weather
// router.get('/weather', authService.verify, weatherController.getWeatherFavoriteCity);
// router.get('/user/favorite-city/weather', authService.verify, weatherController.getWeatherFavoriteCity);

//auth
router.post('/auth/signup', authController.signUp);
router.post('/auth/signin', authController.signIn);

module.exports = router;