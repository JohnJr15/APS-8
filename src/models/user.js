const mongoose = require('../database/index');
const crypto = require('../services/cryptoService');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        default: uuidv4(),
    },
    token: {
        type: String,
        require: false,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    favoriteCities: {
        type: Array,
        require: false,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next) {
    this.password = await crypto.encrypt(this.password);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;