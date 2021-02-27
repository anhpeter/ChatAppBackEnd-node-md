const mongoose = require('mongoose');
const userType = {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    picture: String,
}

const schema = new mongoose.Schema({
    name: String,
    specialName: String,
    members: [userType],
    messages: [{
        from: userType,
        to: userType,
        text: String,
        time: Number,
        read: Boolean,
    }],
    lastMessage: String,
    created: Number,
    createdBy: userType,
});
const model = mongoose.model('conversations', schema);
module.exports = model;