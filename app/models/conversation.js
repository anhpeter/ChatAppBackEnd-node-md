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
            members: {
                $elemMatch: {
                    _id: id
                }
            }
        }, {
            select: "_id"
        }, (err, result) => {
            if (Helper.isFn(callback)) callback(err, result);
        })
    },

    // find
    findInfoByUserIdsOrCreateIfNotExist: function (ids, callback) {
        console.log('ids input', ids);
        this.getModel().findOne({
            members: {
                $size: ids.length,
                $all: ids
            }
        }, {
            _id: 1,
            members: 1,
        }, (err, result) => {
            if (result != null) {
                console.log('members', result.members);
                if (Helper.isFn(callback)) callback(err, result);
            } else {
                // not found
                UserModel.findUsersByIds(ids, (err, users) => {
                    if (!err) {
                        const item = {
                            members: users,
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
                    } else if (Helper.isFn(callback)) callback(err, users);
                })

            }
        });
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
    addMessageToSpecialConversation: function (specialName, message, callback) {
        this.getModel().updateOne({ specialName }, {
            $push: {
                messages: message
            }
        }, (err, result) => {
            if (Helper.isFn(callback)) callback(err, result);
        })
    },

    addMessageToConversationById: function (id, message, callback) {
        this.getModel().findOneAndUpdate(
            {
                _id: id,
            },
            {
                $push: { messages: message }
            },
            {
                select: 'members specialName',
            }, (err, result) => {
                if (Helper.isFn(callback)) callback(err, result);
            })
    },

    getModel: function () {
        return model;
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