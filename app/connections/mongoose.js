'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/DevAsk');

module.exports = mongoose;