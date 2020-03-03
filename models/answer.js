const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {type: String, required: true},
    state: {type: Boolean, required: true},
    explication: {type: String},
    question: { type: Schema.Types.ObjectId, ref: 'Question' }
});

module.exports = mongoose.model('Answer', answerSchema);