'use strict'

const mongoose = require('../connections/mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    id_network: { type: String },
    username: { type: String, required: true, index: { unique:true } },
    email: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    url_foto: { type: String }
});

let User = mongoose.model('user', userSchema);

module.exports = User;