'use strict'

const Question = require('../models/question');
const User = require('../models/user');
const logged = require('../middlewares/logged');
const getUser = require('../middlewares/getuser');

let discussController = function (server) {
    server.route('/guardar-pregunta')

        .post(logged, getUser, function (req, res) {

            let question = new Question({
                user: req.user,
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
        });
};

module.exports = discussController;