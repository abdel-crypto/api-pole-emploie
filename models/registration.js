const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    active: {type: Boolean},
    completed: {type: Boolean, default: false},
    registration_date: {type: String, default: Date.now()},
    completion_date: {type: String, default: null},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' }
});

module.exports = mongoose.model('Registration', registrationSchema);