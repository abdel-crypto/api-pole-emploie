const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    completed: {type: Boolean, default: false},
    course: { type: Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Chapter', chapterSchema);