const onlineUsers = require("../users/onlineUsers");
const chat = (io) => {
    io.on('connection', (socket) => {
        const emitUserLeft = () => {
            let user = onlineUsers.removeBySocketId(socket.id);
            socket.rooms.forEach((room) => {
                io.to(room).emit('user-left', { user });
            });
        }

        socket.on('john', (data) => {
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
            emitUserLeft();
            socket.leave('all');
        })

        socket.on('disconnecting', function () {
            emitUserLeft();
        });
    })

}
module.exports = chat;