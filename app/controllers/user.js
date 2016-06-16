'use strict'

const User = require('../models/user');
const logged = require('../middlewares/logged');
const getUser = require('../middlewares/getuser');

let users = [];

let userController = function (server, io) {

    let io2 = io.of('/chat');

    io2.on('connection', function (socket) {
        socket.join('chat');
        
        socket.on('nuevo usuario', function (data) {
            socket.broadcast.to('chat').emit('devolviendo usuario', data);
        });

        socket.on('nuevo mensaje', function (data) {
            io2.to('chat').emit('devolviendo mensaje', data);
        });
    });

    server.route('/chat')

        .get(logged, getUser, function (req, res) {
            let user = {
                username: req.user.username,
                url_foto: req.user.url_foto
            }
            users.push(user);
            res.render('user/chat', {
                users: users,
                username: req.user.username,
                url_foto: req.user.url_foto
            });
        });
    
    server.route('/logout')

        .get(getUser, function (req, res) {
            users = users.filter(function (el) {
                return el.username !== req.user.username;
            });
            io2.in('chat').emit('logout', req.user);
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