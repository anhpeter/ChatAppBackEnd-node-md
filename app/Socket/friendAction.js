const SocketEventName = require("../defines/Socket/SocketEventName");
const onlineUsers = require("../users/onlineUsers");

const friendAction = (io) => {
    io.on('connection', (socket) => {
        socket.on(SocketEventName.addFriend, (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit(SocketEventName.friendRequested, { user });
                })
            }
        })
        socket.on(SocketEventName.acceptFriend, (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit(SocketEventName.friendAccepted, { user });
                })
            }
        })
        socket.on(SocketEventName.unfriend, (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit(SocketEventName.friendUnfriend, { user });
                })
            }
        })
        socket.on(SocketEventName.cancelFriendRequest, (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit(SocketEventName.friendRequestCanceled, { user });
                })
            }
        })
        socket.on(SocketEventName.deleteFriendRequest, (data) => {
            const { user, friendId } = data;
            const friend = onlineUsers.findById(friendId);
            if (friend) {
                friend.socketIds.forEach((socketId) => {
                    io.to(socketId).emit(SocketEventName.friendRejected, { user });
                })
            }
        })
    })

}
module.exports = friendAction;