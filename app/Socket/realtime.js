const Helper = require("../defines/Helper");
const RoomName = require("../defines/Socket/RoomName");
const SocketEventName = require("../defines/Socket/SocketEventName");
const MyModel = require("../models/user");
const onlineUsers = require("../users/onlineUsers");
const chat = require("./chat");
const friendAction = require('./friendAction');

const realtime = (io) => {
    friendAction(io);
    chat(io);
    io.on('connection', (socket) => {
        const emitAllOnlineUsers = () => {
            io.emit(SocketEventName.onlineUsers, onlineUsers.getUsersArr());
            console.log('online users', onlineUsers.showOnlineUsers());
        }

        socket.on(SocketEventName.signIn, (data) => {
            onlineUsers.addUser(data.user, socket.id);
            emitAllOnlineUsers();
        })

        socket.on(SocketEventName.joinUsersToConversation, (data) => {
            const { ids, conversationId } = data;
            onlineUsers.loopOnlineUsersByIds(ids, (item) => {
                item.socketIds.forEach((socketId) => {
                    const clientSocket = io.of('/').sockets.get(socketId)
                    if (clientSocket) clientSocket.join(conversationId);
                })
            })
        })

        socket.on(SocketEventName.joinRoom, (data) => {
            if (data.roomName) socket.join(data.roomName);
        })

        socket.on(SocketEventName.leaveRoom, (data) => {
            if (data.roomName) socket.leave(data.roomName);
        })

        socket.on(SocketEventName.getOnlineUsers, () => {
            emitAllOnlineUsers();
        })

        socket.on(SocketEventName.updateUser, (data) => {
            const { id } = data;
            const user = onlineUsers.findById(id);
            if (user) {
                const socketIds = user.socketIds;
                MyModel.findById(user._id, (err, doc) => {
                    if (!err) {
                        socketIds.forEach((socketId) => {
                            io.to(socketId).emit(SocketEventName.updateUser, doc);
                            onlineUsers.updateById(id, doc);
                        })
                    }
                })
            }
        })

        socket.on(SocketEventName.signOut, (data) => {
            onlineUsers.removeBySocketId(socket.id);
            const rooms = socket.rooms;
            rooms.forEach((roomName) => {
                socket.leave(roomName);
            })
            emitAllOnlineUsers();
        })

        socket.on('disconnecting', function () {
            onlineUsers.removeBySocketId(socket.id);
            emitAllOnlineUsers();
        });

        socket.on('disconnect', () => {
        })
    })
}
module.exports = realtime;