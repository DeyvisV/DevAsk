'use strict'

const Answer = require('../models/answer');
const Question = require('../models/question');
const User = require('../models/user');
const logged = require('../middlewares/logged');
const getUser = require('../middlewares/getuser');
const slugs =require('slugs');

let discussController = function (server, io) {

    io.on('connection', function (socket) {
        socket.join('home');
        console.log('usuario');
    });
    
    server.route('/guardar-pregunta')

        .post(logged, getUser, function (req, res) {

            let question = new Question({
                user: req.user,
                title: req.body.title,
                content: req.body.content,
                slug: slugs(req.body.title)
            });
            question.save(function(err) {
                if (err) {
                    console.log('error');
                    return;
                }
                io.to('home').emit('preguntando', {
                    username: req.user.username,
                    url_foto: req.user.url_foto,
                    content: req.body.content,
                    created: question.created
                });
            });
            res.redirect('/');
        });

    server.route('/pregunta/:slug')

        .get(function (req, res) {
            Question
            .findOne({ slug: req.params.slug })
            .populate('user')
            .exec(function (err, question) {
                Answer
                .find({ question: question })
                .populate('user')
                .sort('created')
                .exec(function (err, answers) {
                    res.render('discuss/question_detail', { 
                        question: question,
                        answers: answers
                    });
                });
            });
        })

        .post(logged, getUser, function (req, res) {
            Question
            .findOne({ slug: req.params.slug })
            .populate('user')
            .exec(function (err, question) {
                let answer = new Answer({
                    question: question,
                    user: req.user,
                    content: req.body.content
                });
                answer.save(function (err) {
                    if (err) {
                        console.log('error');
                        return;
                    }
                });
                res.redirect('/pregunta/' + req.params.slug);
            });
        });
};

module.exports = discussController;