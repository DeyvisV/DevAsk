'use strict'

const mongoose = require('../connections/mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    title: { type: String },
    content: { type: String }
});

let Question = mongoose.model('question', questionSchema);

module.exports = Question;