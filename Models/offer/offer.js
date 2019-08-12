const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema({
    type: String,
    name: String,
    claimNo: Number,
    endDate: String
});

module.exports = mongoose.model('offer', offerSchema, 'offers');