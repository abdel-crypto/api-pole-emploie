const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date_of_registration: { type: String, default: Date.now()},
    profile_validated: {type: Boolean, default: false},
    pole_emploi_id: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('User', userSchema);