const onlineUsers = {
    users: [],

    addUser: function (user, socketId) {
        let item = this.findByUsername(user.username);
        if (item) {
            item.socketIds.push(socketId);
        } else {
            this.users.push({ ...user, socketIds: [socketId] });
        }
    },

    removeBySocketId: function (socketId) {
        let index = this.findIndexBySocketId(socketId);
        if (index > -1) {
            let user = this.users[index];
            let count = user.socketIds.length;
            if (count > 1) {
                let idIndex = user.socketIds.indexOf(socketId);
                user.socketIds.splice(idIndex, 1);
            } else {
                this.users.splice(index, 1);
            }
            return user;
        }
    },

    // FIND USER
    findBySocketId: function (socketId) {
        let index = this.findIndexBySocketId(socketId);
        if (index > -1) return this.users[index];
        return null;
    },

    findIndexBySocketId: function (socketId) {
        return this.users.findIndex((user) => {
            return (user.socketIds.indexOf(socketId) > -1);
        })
    },

    findByUsername: function (username) {
        let index = this.findIndexByUsername(username);
        if (index > -1) return this.users[index];
        return null;
    },

    findIndexByUsername: function (username) {
        return this.users.findIndex((user) => {
            return (user.username === username);
        })
    },

    showOnlineUsers: function () {
        return onlineUsers.users.map((user) => {
            return { username: user.username, socketCount: user.socketIds.length };
        });
    }
}

module.exports = onlineUsers;