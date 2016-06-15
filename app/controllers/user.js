'use strict'

const User = require('../models/user');

let userController = function (server) {
    
    server.route('/logout')

        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    server.route('/extra-data')

        .get(function(req, res) {
            User.findOne({ id_network: req.user.id }, function(err, user) {
                if (user) {
                    res.redirect('/');
                    return;
                }
                else {
                    res.render('user/extra_data');
                }
            });
        })
        .post(function(req, res) {
            let username = req.body.username;
            let email = req.body.email;
            if (req.user.provider == 'facebook') {
                let user = new User({
                    id_network: req.user.id,
                    username: username,
                    email: email,
                    first_name: req.user.name.givenName,
                    last_name: req.user.name.familyName,
                    url_foto: 'http://graph.facebook.com/'+req.user.id+'/picture'
                });
                user.save(function(err) {
                    if (err) {
                        console.log('error');
                        return;
                    }
                });
            }

            if (req.user.provider == 'twitter') {
                let user = new User({
                    id_network: req.user.id,
                    username: username,
                    email: email,
                    first_name: req.user.displayName,
                    url_foto: req.user.photos[0].value
                });
                user.save(function(err) {
                    if (err) {
                        console.log('error');
                        return;
                    }
                });
            }

            res.redirect('/');
        });
}

module.exports = userController;