const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: String,
    password: String,
    picture: String,
});
const model = mongoose.model('users', schema);
module.exports = model;