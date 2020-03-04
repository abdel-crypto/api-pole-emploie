const mongoose = require('mongoose');
const randtoken = require('rand-token');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {type: String, default: randtoken.generate(13)},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date_of_registration: { type: String, default: Date.now()},
    profile_validated: {type: Boolean, default: false},
    pole_emploi_id: {type: String, required: true, unique: true},
    registrations : [{ type: Schema.Types.ObjectId, ref: 'Registration' }]
});

module.exports = mongoose.model('User', userSchema);