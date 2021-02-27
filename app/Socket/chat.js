const RoomName = require("../defines/Socket/RoomName");
const SocketEventName = require("../defines/Socket/SocketEventName");
const onlineUsers = require("../users/onlineUsers");
const ConversationModel = require('../models/conversation');
const MyTime = require("../defines/MyTime");
const Helper = require("../defines/Helper");

const supportFn = {
    getCurrentConvoIdFormat: (convoId) => {
        return `${convoId}_current`;
    }
}

const chat = (io) => {
    io.on('connection', (socket) => {
        socket.on(SocketEventName.signIn, (data) => {
            socket.join(data.user._id);

            // get all conversation
            ConversationModel.listIdsByUserId(data.user._id, (err, result) => {
                if (!err) {
                    if (result.length > 0) {
                        const items = Helper.getArrayOfFieldValue(result, '_id', 'string');
                        socket.join(items);
                    }
                }
            })
        })

        socket.on(SocketEventName.sendMessage, (data) => {
            const { user, message, conversationId } = data;
            const item = {
                from: user, text: message, time: MyTime.getUTCNow(),
            }
            ConversationModel.addMessageToConversationById(conversationId, item, (err, result) => {
                if (!err && result) {
                    io.to(conversationId).emit(SocketEventName.receiveMessage, item);
                }
            })
        })

        socket.on(SocketEventName.typing, (data) => {
            const { conversationId } = data;
            socket.to(supportFn.getCurrentConvoIdFormat(conversationId)).emit(SocketEventName.typing, data)
        })

        socket.on(SocketEventName.stopTyping, (data) => {
            const { conversationId } = data;
            socket.to(supportFn.getCurrentConvoIdFormat(conversationId)).emit(SocketEventName.stopTyping, data)
        })

        socket.on('disconnecting', function () {
        });
    })

}
module.exports = chat;