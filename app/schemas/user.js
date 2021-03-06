const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    password: String,
    picture: String,
    friend: {
        friend: [mongoose.Schema.Types.ObjectId,],
        request: [mongoose.Schema.Types.ObjectId,],
        sent_request: [mongoose.Schema.Types.ObjectId,],
    },
});

const model = mongoose.model('users', schema);
module.exports = model;