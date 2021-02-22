const express = require('express');
const Helper = require('../app/defines/Helper');
const ErrorMessage = require('../app/defines/Messages/ErrorMessage');
const MyResponse = require('../app/defines/MyResponse');
const router = express.Router();
const MainModel = require('../app/models/user');

// GET =======================
router.get('/all', (req, res) => {
    MainModel.listAll((err, result) => {
        res.json(result)
    })
})

router.get('/getFriendsByUsername', (req, res, next) => {
    const { username } = req.query;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findFriendsByUsername(username, (err, docs) => {
            if (err) MyResponse.error(res, err);
            else
                if (docs)
                    MyResponse.success(res, docs);
                else
                    MyResponse.fail(res);
        });
    }, username)
})

router.post('/getUsersByIds', (req, res, next) => {
    const { ids } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findUsersByIds(ids, (err, docs) => {
            if (err) MyResponse.error(res, err);
            else
                if (docs)
                    MyResponse.success(res, docs);
                else
                    MyResponse.fail(res);
        });
    }, ids)
})

router.get('/getStrangerByUsername', (req, res, next) => {
    const { username } = req.query;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findStrangerByUsername(username, (err, docs) => {
            if (err) MyResponse.error(res, err);
            else
                if (docs)
                    MyResponse.success(res, docs);
                else
                    MyResponse.fail(res);
        });
    }, username)
})

router.get('/getSentRequestFriendById', (req, res, next) => {
    const { id } = req.query;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findSentRequestFriendById(id, (err, docs) => {
            if (err) MyResponse.error(res, err);
            else
                if (docs)
                    MyResponse.success(res, docs);
                else
                    MyResponse.fail(res);
        });
    }, id)
})

router.post('/getUserByUsernameAndPassword', (req, res, next) => {
    const { username, password } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findByUsernameAndPassword(username, password, (err, doc) => {
            if (err) MyResponse.error(res, err);
            else
                if (doc)
                    MyResponse.success(res, doc);
                else
                    MyResponse.fail(res);
        });
    }, username, password)
})

router.get('/getUserByUsername', (req, res, next) => {
    const { username } = req.query;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findByUsername(username, (err, doc) => {
            if (err) MyResponse.error(res, err);
            else
                if (doc)
                    MyResponse.success(res, doc);
                else
                    MyResponse.fail(res);
        });
    }, username)
})

// CREATE
router.post('/createAccount', (req, res, next) => {
    const { username, password } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.insert({ username, password }, (err, doc) => {
            if (err) MyResponse.error(res, err);
            else
                if (doc)
                    MyResponse.success(res, doc);
                else
                    MyResponse.fail(res);
        });
    }, username, password)
})

// FRIEND ACTIONS
router.post('/unfriend', (req, res) => {
    const { id, friendId } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.unfriendById(id, friendId, (err, result) => {
            if (err)
                MyResponse.error(res, err);
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    }, id, friendId)
})
router.post('/sentFriendRequest', (req, res) => {
    const { id, friendId } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.sentFriendRequestById(id, friendId, (err, result) => {
            if (err)
                MyResponse.error(res, err);
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    }, id, friendId)
})

router.post('/confirmFriendRequest', (req, res) => {
    const { id, friendId } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.confirmFriendRequest(id, friendId, (err, result) => {
            if (err) {
                MyResponse.error(res, err);
            }
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    }, id, friendId)
})
router.post('/cancelFriendRequest', (req, res) => {
    const { id, friendId } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.cancelFriendRequest(id, friendId, (err, result) => {
            if (err) {
                MyResponse.error(res, err);
            }
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    }, id, friendId)
})

router.post('/deleteFriendRequest', (req, res) => {
    const { id, friendId } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.deleteFriendRequest(id, friendId, (err, result) => {
            if (err) {
                MyResponse.error(res, err);
            }
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    }, id, friendId)
})
router.post('/cancelFriendRequest', (req, res) => {
    const { id, friendId } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.cancelFriendRequest(id, friendId, (err, result) => {
            if (err) {
                MyResponse.error(res, err);
            }
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    }, id, friendId)
})

// RUN ACTION
router.get('/runAction', (req, res) => {
})

// RESET DATABASE
router.get('/reset', (req, res) => {
    MainModel.reset((err, result) => {
        res.json(result)
    })
})
module.exports = router;