const User = require('../models/user');

const getById = async id => User.findOne({ id });

const getByEmail = async email => User.findOne({ email }).select('+password');

const create = async user => User.create(user);

const put = async (query = {}, values = {}) => User.findOneAndUpdate(query, values, { new: true });

const get = async () => {
    const data = await User.find({}, 'id name email favoriteCities');
    return data;
};

const getWithFilter = async filter => {
    const data = await User.findOne(filter, 'id name email favoriteCities');
    return data;
};

module.exports = {
    getById,
    getByEmail,
    create,
    put,
    get,
    getWithFilter,
};