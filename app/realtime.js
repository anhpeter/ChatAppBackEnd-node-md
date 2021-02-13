const onlineUsers = require("./users/onlineUsers")

const realtime = (io) => {
    io.on('connection', (socket) => {
        console.log('user connected');
        const emitAllOnlineUsers = () => {
            io.emit('onlineUsers', onlineUsers.users);
            console.log('online users', onlineUsers.showOnlineUsers());
        }
        socket.on('john', (data) => {
            onlineUsers.addUser(data.user, socket.id);
            emitAllOnlineUsers();
        })

        socket.on('leave', (data) => {
            onlineUsers.removeBySocketId(socket.id);
            emitAllOnlineUsers();
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
            onlineUsers.removeBySocketId(socket.id);
            emitAllOnlineUsers();
        })
    })
}
module.exports = realtime;