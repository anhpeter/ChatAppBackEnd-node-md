const RoomName = require("../defines/Socket/RoomName");
const SocketEventName = require("../defines/Socket/SocketEventName");
const onlineUsers = require("../users/onlineUsers");
const chat = (io) => {
    io.on('connection', (socket) => {
        const emitUserLeft = () => {
            let user = onlineUsers.removeBySocketId(socket.id);
            socket.rooms.forEach((room) => {
                io.to(room).emit(SocketEventName.userLeft, { user });
            });
        }

        socket.on(SocketEventName.join, (data) => {
            io.to(RoomName.all).emit(SocketEventName.newJoiner, data)
        })

        socket.on(SocketEventName.sendMessage, (data) => {
            io.to(RoomName.all).emit(SocketEventName.receiveMessage, data);
        })

        socket.on(SocketEventName.typing, (data) => {
            socket.to(RoomName.all).emit(SocketEventName.typing, data)
        })

        socket.on(SocketEventName.stopTyping, (data) => {
            socket.to(RoomName.all).emit(SocketEventName.stopTyping, data)
        })

        socket.on(SocketEventName.leave, (data) => {
            emitUserLeft();
            socket.leave(RoomName.all);
        })

        socket.on('disconnecting', function () {
            emitUserLeft();
        });
    })

}
module.exports = chat;