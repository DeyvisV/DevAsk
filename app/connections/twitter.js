'use strict'

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const dotenv = require('dotenv').config();

let twitterConnection = function (server){
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TW_KEY,
        consumerSecret: process.env.TW_SECRET,
        callbackURL: 'http://localhost:8000/auth/twitter/callback',
    }, function (accessToken, RefreshToken, profile, done){
        done(null, profile);
    }));

    server.get('/auth/twitter', passport.authenticate('twitter'));

    server.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/error'}));
};

module.exports = twitterConnection;