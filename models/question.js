const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {type: String, required: true},
    chapter: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Question', questionSchema);