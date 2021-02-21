const onlineUsers = require("../users/onlineUsers");

const friendAction = (io) => {
    io.on('connection', (socket) => {
        socket.on('add-friend', (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit('friend-requested', { user });
                })
            }
        })
        socket.on('accept-friend', (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit('friend-accepted', { user });
                })
            }
        })
        socket.on('unfriend', (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit('friend-unfriend', { user });
                })
            }
        })
        socket.on('cancel-friend-request', (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit('friend-request-canceled', { user });
                })
            }
        })
    })

}
module.exports = friendAction;