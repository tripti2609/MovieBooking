const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: String,
    genre: String,
    albums: Number
});

module.exports = mongoose.model('Artist', artistSchema);
