const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configAppSchema = new Schema({
    lockRegister: {type: Boolean, default: false},
    showMemFamilyName: {type: Boolean, default: true},
    showPhoneNumber: {type: Boolean, default: true},
    showEmailAddress: {type: Boolean, default: true},
    PhoneNumber: {type: String},
    EmailAddress: {type: String},
    MemFamilyName: {type: String},
})


module.exports = mongoose.model('ConfigApp', configAppSchema);
