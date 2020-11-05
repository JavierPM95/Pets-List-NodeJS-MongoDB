const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petsSchema = new Schema({
    type: String,
    name: String
})

const petsModel = mongoose.model('Pet', petsSchema);

module.exports = petsModel;