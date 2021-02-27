const Helper = require("../defines/Helper");

const onlineUsers = {
    users: {},

    addUser: function (user, socketId) {
        let item = this.users[user._id];
        if (item) {
            item.socketIds.push(socketId);
        } else {
            this.users[user._id] = { ...user, socketIds: [socketId] };
        }
    },

    removeBySocketId: function (socketId) {
        let key = this.findKeyBySocketId(socketId);
        if (key) {
            let item = this.users[key];
            let count = item.socketIds.length;
            if (count > 1) {
                let idIndex = item.socketIds.indexOf(socketId);
                item.socketIds.splice(idIndex, 1);
            } else {
                delete this.users[key];
            }
            return item;
        }
    },

    // FIND USER
    findSocketIdsById: function (id) {
        const item = this.findById(id);
        if (item) return item.socketIds;
        return null;
    },

    findBySocketId: function (socketId) {
        let key = this.findKeyBySocketId(socketId);
        if (key) return this.users[key];
        return null;
    },

    findKeyBySocketId: function (socketId) {
        for (let key in this.users) {
            let socketIds = this.users[key].socketIds;
            if (socketIds.indexOf(socketId) > -1) return key;
        }
        return null;
    },

    findById: function (id) {
        return this.users[id] || null;
    },

    showOnlineUsers: function () {
        let usersArr = this.getUsersArr();
        return usersArr.map((user) => {
            return { username: user.username, socketCount: user.socketIds.length };
        });
    },

    getUsersArr: function () {
        let usersArr = Object.values(this.users);
        return usersArr;
    },

    updateById: function (id, item) {
        const user = { ...this.users[id] };
        this.users[id] = { ...user, ...item };
    },

    isUserOnline: function (userId) {
        const user = this.users[userId];
        return user != null;
    },

    loopOnlineUsersByIds: function (ids, callback) {
        ids.forEach((id) => {
            const item = this.findById(id);
            if (item){
                if (Helper.isFn(callback)) callback(item);
            }
        })
    }


}

module.exports = onlineUsers;