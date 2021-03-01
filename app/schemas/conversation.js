const mongoose = require('mongoose');

const idType = mongoose.Schema.Types.ObjectId;
const userType = {
    _id: idType,
    username: String,
    picture: String,
}

const messageType = {
    from: userType,
    to: userType,
    text: String,
    time: Number,
    read: Boolean,
}

const schema = new mongoose.Schema({
    name: String,
    specialName: String,
    members: [idType],
    messages: [messageType],
    lastMessage: messageType,
    created: Number,
    createdBy: idType,
});
const model = mongoose.model('conversations', schema);
module.exports = model;