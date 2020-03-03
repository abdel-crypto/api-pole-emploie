const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterTypeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
});

module.exports = mongoose.model('ChapterType', chapterTypeSchema);