'use strict'

const path = require('path');
const express = require('express');
const http = require('http');
const swig = require('swig');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const server = express();
const server_socket = http.createServer(server).listen(8000);
const io = require('socket.io').listen(server_socket);

swig.setDefaults({
    cache: false
});

// Config Express
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    secret: 'mi clave',
    resave: true,
    saveUninitialized: true
}));

// Config Passport
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user); //req.user
});

passport.deserializeUser(function (user, done) {
    done(null, user); 
});

// Config Swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'app', 'views'));

server.use(express.static('./public'));

// Controllers
require('./app/controllers/home')(server);
require('./app/controllers/user')(server, io);
require('./app/controllers/discuss')(server, io);

// Connections
require('./app/connections/facebook')(server);
require('./app/connections/twitter')(server);