const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: String,
    password: String,
    picture: String,
    friend: {
        friend: [mongoose.Schema.Types.ObjectId,],
        request: [mongoose.ObjectId],
        sent_request: [mongoose.ObjectId],
    },
});
const model = mongoose.model('users', schema);
module.exports = model;