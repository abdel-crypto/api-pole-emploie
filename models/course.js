const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    prime_amount: {type: Number, required: true},
    estimation_time: {type: Number, required: true},
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
});

module.exports = mongoose.model('Course', courseSchema);