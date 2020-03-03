const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    completed: {type: Boolean, default: false},
    chapter_type: { type: Schema.Types.ObjectId, ref: 'ChapterType' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Chapter', chapterSchema);