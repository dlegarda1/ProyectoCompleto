const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modeloMDB = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('modeloMDB', modeloMDB);