const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    registration_date: {type: String, default: Date.now()},
    completion_date: {type: String, default: Date.now()},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Registration', registrationSchema);