'use strict'

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv').config();

let facebookConnection = function (server) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: 'http://localhost:8000/auth/facebook/callback',
        scope: ['public_profile', 'email', 'user_friends'],
        profileFields: ['id', 'email', 'displayName', 'first_name', 'last_name']
    }, function (accessToken, RefreshToken, profile, done) {
        done(null, profile);
    }));

    server.get('/auth/facebook', passport.authenticate('facebook'));

    server.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/extra-data', failureRedirect: '/error'}));
};

module.exports = facebookConnection;