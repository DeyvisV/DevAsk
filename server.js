'use stric'

const path = require('path');
const express = require('express');
const swig = require('swig');

const server = express();

// Config Swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
//server.set('views', __dirname + '/app/views');
server.set('views', path.join(__dirname, 'app', 'views'));

require('./app/controllers/home')(server);

server.listen(8000);