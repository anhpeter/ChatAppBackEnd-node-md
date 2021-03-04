const Helper = require('../defines/Helper');
const mongoose = require('mongoose');
const model = require('../schemas/conversation');
const Model = require('./Model');
const RoomName = require('../defines/Socket/RoomName');
const UserModel = require('./user');
const MyTime = require('../defines/MyTime');
const MyModel = {
    ...Model,

    // list
    listAll: function (callback) {
        this.getModel().find({}, (err, docs) => {
            if (Helper.isFn(callback)) callback(err, docs);
        })
    },

    listIdsByUserId: function (id, callback) {
        this.getModel().find({
            members: new mongoose.Types.ObjectId(id),
        }, {}, {
            select: "_id"
        }, (err, result) => {
            if (Helper.isFn(callback)) callback(err, result);
        })
    },

    // find
    findInfoByUserIdsOrCreateIfNotExist: function (ids, callback) {
        this.getModel().findOne({
            members: this.getMemberIdsMatch(ids),
        }, {
            _id: 1,
            members: 1,
        }, (err, result) => {
            if (result != null) {
                if (Helper.isFn(callback)) callback(err, result);
            } else {
                // not found
                const item = {
                    members: ids,
                    created: MyTime.getUTCNow(),
                }
                this.insert(item, (err, doc) => {
                    if (Helper.isFn(callback)) {
                        if (err) callback(err, doc);
                        else {
                            let temp = { ...doc._doc };
                            temp.isNew = true;
                            callback(err, temp);
                        }
                    }
                })


            }
        });
    },

    createConversationByMemberIds: function (ids, message, callback) {
        const item = {
            members: ids,
            messages: [],
            created: MyTime.getUTCNow(),
        }
        if (message) {
            item.messages.push(message);
            item.lastMessage = message;
        }
        this.insert(item, (err, doc) => {
            console.log(err, doc);
            if (Helper.isFn(callback)) callback(err, doc);
        })

    },

    findByUserIds: function (ids, callback) {
        this.getModel().findOne({
            members: {
                $size: ids.length,
                $elemMatch: {
                    _id: {
                        $in: ids
                    }
                }
            }
        }, (err, doc) => {
            if (Helper.isFn(callback)) callback(err, doc);
        })
    },

    findById: function (id, callback) {
        this.getModel().findOne({ _id: id }, (err, doc) => {
            if (Helper.isFn(callback)) callback(err, doc);
        })
    },

    findByMemberIds: function (ids, callback) {
        this.getModel().findOne({
            members: this.getMemberIdsMatch(ids)
        }, (err, doc) => {
            if (Helper.isFn(callback)) callback(err, doc);
        })
    },

    findSidebarItemById: function (id, callback) {
        this.getModel().aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            this.getMembersLookup(),
            this.getSidebarItemProjection(),
            {
                $limit: 1,
            }
        ], (err, docs) => {
            const [doc] = docs;
            if (Helper.isFn(callback)) callback(err, doc);
        })
    },

    listItemsForListDisplay: function (id, callback) {
        this.getModel().aggregate([
            {
                $match: {
                    members: new mongoose.Types.ObjectId(id),
                    lastMessage: {
                        $exists: true
                    }
                }
            },
            this.getMembersLookup(),
            this.getSidebarItemProjection(),
            {
                $sort: {
                    'lastMessage.time': -1
                }
            }
        ], (err, docs) => {
            if (Helper.isFn(callback)) callback(err, docs);
        })
    },

    findBySpecialName: function (callback) {
        this.getModel().findOne({ specialName: RoomName.all }, (err, doc) => {
            if (Helper.isFn(callback)) callback(err, doc);
        })
    },

    // manipulation
    insert: function (object, callback) {
        const item = new this.getModel()(object);
        item.save((err, doc) => {
            if (Helper.isFn(callback)) callback(err, doc);
        })
    },

    // add messages
    addMessageToConversationById: function (id, message, callback) {
        this.getModel().findOneAndUpdate(
            {
                _id: id,
            },
            {
                lastMessage: message,
                $push: { messages: message }
            },
            {
                select: 'members',
            }, (err, result) => {
                if (Helper.isFn(callback)) callback(err, result);
            })
    },

    getModel: function () {
        return model;
    },

    // options
    getMemberIdsMatch: function (ids) {
        ids = this.convertStringArrayToObjectIdArray(ids);
        return {
            $size: ids.length,
            $all: ids,
        }
    },

    getMembersLookup: function () {
        return {
            $lookup: {
                from: "users",
                let: { the_members: "$members", },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $in: ["$_id", "$$the_members"] }
                                    ]
                            }
                        },
                    },
                    {
                        $project: {
                            username: 1,
                            picture: 1,
                        }
                    }
                ],
                as: "members"
            },
        }
    },

    getSidebarItemProjection: function () {
        return {
            $project: {
                name: 1,
                members: 1,
                lastMessage: 1,
            }
        }
    },

    // 
    reset: function (callback) {
        const items = [];
        this.getModel().deleteMany({}, (err, result) => {
            let promises = [];
            items.forEach((item) => {
                let promise = new Promise((resolve) => {
                    this.insert(item, (err, doc) => {
                        resolve(doc);
                    })
                })
                promises.push(promise);
            })
            Promise.all(promises)
                .then((result) => {
                    if (Helper.isFn(callback)) callback(null, result);
                }).catch((err) => {
                    if (Helper.isFn(callback)) callback(err, null);
                })
        })
    }

}
module.exports = MyModel;