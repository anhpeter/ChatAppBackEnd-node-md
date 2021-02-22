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

        socket.on(SocketEventName.join, (data) => {
            socket.join(RoomName.all);
            onlineUsers.addUser(data.user, socket.id);
            emitAllOnlineUsers();
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

        socket.on(SocketEventName.leave, (data) => {
            onlineUsers.removeBySocketId(socket.id);
            emitAllOnlineUsers();
            socket.leave(RoomName.all);
        })

        socket.on('disconnecting', function () {
            emitAllOnlineUsers();
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })
}
module.exports = realtime;