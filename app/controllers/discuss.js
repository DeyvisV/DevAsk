'use strict'

const Question = require('../models/question');
const User = require('../models/user');

let discussController = function (server) {
    server.route('/guardar-pregunta')

        .post(function (req, res) {
            User.findOne({ id_network: req.user.id }, function(err, user) {
                if (user) {
                    let question = new Question({
                        user: user,
                        title: req.body.title,
                        content: req.body.content
                    });
                    question.save(function(err) {
                        if (err) {
                            console.log('error');
                            return;
                        }
                    });
                    res.redirect('/');
                }
            });
        });
};

module.exports = discussController;