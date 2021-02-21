const MyModel = require("../models/user");
const onlineUsers = require("../users/onlineUsers");
const chat = require("./chat");
const friendAction = require('./friendAction');


const realtime = (io) => {
    friendAction(io);
    chat(io);
    io.on('connection', (socket) => {
        console.log('user connected');
        const emitAllOnlineUsers = () => {
            io.emit('online-users', onlineUsers.users);
            console.log('online users', onlineUsers.showOnlineUsers());
        }
        socket.on('john', (data) => {
            console.log('realtime john event');
            socket.join('all');
            onlineUsers.addUser(data.user, socket.id);
            emitAllOnlineUsers();
        })

        socket.on('update-user', (data) => {
            console.log('update user event', data);
            const { id } = data;
            const user = onlineUsers.findById(id);
            if (user) {
                const socketIds = user.socketIds;
                MyModel.findById(user._id, (err, doc) => {
                    if (!err) {
                        console.log('user', doc);

                        socketIds.forEach((socketId) => {
                            io.to(socketId).emit('update-user', doc);
                            onlineUsers.updateById(id, doc);
                        })
                    }
                })
            }
        })

        socket.on('leave', (data) => {
            onlineUsers.removeBySocketId(socket.id);
            emitAllOnlineUsers();
            socket.leave('all');
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