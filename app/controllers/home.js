'use strict'

const Question = require('../models/question');

let homeController = function (server) {
    console.log('homeController listo');

    server.route('/')

        .get(function (req, res) {
            Question
            .find({})
            .populate('user')
            .limit(5)
            .sort('-created')
            .exec(function (err, questions) {
                console.log(questions)
                if (req.user) {
                    let username, url_foto;
                    if (req.user.provider == 'facebook') {
                        username = req.user._json.first_name;
                        url_foto = 'http://graph.facebook.com/'+req.user.id+'/picture';
                    }
                    if (req.user.provider == 'twitter') {
                        username = req.user.username;
                        url_foto = req.user.photos[0].value;
                    }
                    res.render('home/index', {
                        username: username,
                        url_foto: url_foto,
                        questions: questions
                    });
                }
                else {
                    res.render('home/index', {
                        questions: questions
                    });
                }
            });
        });
};

module.exports = homeController;