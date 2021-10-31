const User = require('../models/user.js');

function findByUsername(userName) {
    return User.findOne({ where: { username: userName } });
}

function save(user) {
    return User.create({
        username: user.username,
        password: user.password,
        balance: 0.0
    });
}

module.exports = { findByUsername, save }