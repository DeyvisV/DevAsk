'use strict'

const User = require('../models/user');

let getuserMiddleware = function (req, res, next) {
    User.findOne({ id_network: req.user.id }, function (err, user) {
        req.user = user;
        next();
    });
}

module.exports = getuserMiddleware;