const mongoose = require('mongoose');
const { mongo } = require('../../config');

mongoose.connect(mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;