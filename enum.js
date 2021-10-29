module.exports = {
    USER_NOT_FOUND: 'User not found!',
    EMAIL_ALREADY_EXISTS: 'E-mail already exists!',
    USER_OR_PASSWORD_INCORRECT: 'User or password incorrect!',
    USER_WITHOUT_FAVORITE_CITIES: 'User do not have favorite cities yet!',
    FIND_USER_INVALID_PARAMETERS: 'You must inform the id to find a user',
    SIGN_IN_INVALID_PARAMETERS: 'You must inform the email and password sign in',
    SIGN_UP_INVALID_PARAMETERS: 'You must inform the name, email and password to create a user',
    REMOVE_FAVORITE_CITY_INVALID_PARAMETERS: 'You must inform the cityId to remove it from the favorite cities',
    FAVORITE_CITIES_LIMIT_REACHED: 'You cannot add more than 5 cities to the favorites. Please remove one and try again',
    ADD_FAVORITE_CITY_INVALID_PARAMETERS: 'You must inform the cityName and cityId to add a city to the favorite cities',
    CITY_ALREADY_FAVORITE: 'The city: {{cityName}} - id: {{cityId}} already is favorite. Please try again with another city',
    GET_WEATHER_INVALID_PARAMETERS: 'You need to inform at least one of this params to get the weather: (latitude and longitude), cityName, cityId',
};