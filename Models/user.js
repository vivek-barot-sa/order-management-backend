const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    address: String,
    pincode: Number,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.model('user', userSchema, 'users');