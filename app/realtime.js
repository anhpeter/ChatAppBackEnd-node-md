const onlineUsers = require("./users/onlineUsers")

const realtime = (io) => {
    io.on('connection', (socket) => {
        console.log('user connected');
        const emitAllOnlineUsers = () => {
            io.emit('onlineUsers', onlineUsers.users);
            console.log('online users', onlineUsers.showOnlineUsers());
        }
        socket.on('john', (data) => {
            socket.join('all');
            onlineUsers.addUser(data.user, socket.id);
            emitAllOnlineUsers();
            io.to('all').emit('new-joiner', data);
        })

        socket.on('send-message', (data) => {
            io.to('all').emit('receive-message', data);
        })

        socket.on('typing', (data) => {
            socket.to('all').emit('typing', data)
        })

        socket.on('stop-typing', (data) => {
            socket.to('all').emit('stop-typing', data)
        })

        socket.on('leave', (data) => {
            onlineUsers.removeBySocketId(socket.id);
            emitAllOnlineUsers();
            socket.leave('all');
        })

        socket.on('disconnecting', function () {
            let user = onlineUsers.removeBySocketId(socket.id);
            socket.rooms.forEach((room) => {
                io.to(room).emit('user-left', { user });
            });
            emitAllOnlineUsers();
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })
}
module.exports = realtime;