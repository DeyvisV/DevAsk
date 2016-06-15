'use strict'

const mongoose = require('../connections/mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
    question: { type: Schema.Types.ObjectId, ref: 'question' },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    content: { type: String },
    created: { type: Date, default: Date.now }
});

let Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;