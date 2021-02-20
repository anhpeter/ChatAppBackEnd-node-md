const express = require('express');
const MyResponse = require('../app/defines/MyResponse');
const router = express.Router();
const MainModel = require('../app/models/user');



// CHECK USERNAME EXIST
router.get('/getUserByUsername', (req, res, next) => {
    const { username } = req.query;
    MainModel.findByUsername(username, (err, doc) => {
        if (err) MyResponse.error(res, err);
        else
            if (doc)
                MyResponse.success(res, doc);
            else
                MyResponse.fail(res);
    });
})

// CREATE A ACCOUNT
router.post('/createAccount', (req, res, next) => {
    const { username, password } = req.body;
    MainModel.insert({ username, password }, (err, doc) => {
        if (err) MyResponse.error(res, err);
        else
            if (doc)
                MyResponse.success(res, doc);
            else
                MyResponse.fail(res);
    });
})

// GET ALL USER FRIENDS BY USERNAME
router.get('/getFriendsByUsername', (req, res, next) => {
    const { username } = req.query;
    MainModel.findFriendsByUsername(username, (err, docs) => {
        if (err) MyResponse.error(res, err);
        else
            if (docs)
                MyResponse.success(res, docs);
            else
                MyResponse.fail(res);
    });
})

// GET USERS BY IDS
router.post('/getUsersByIds', (req, res, next) => {
    const { ids } = req.body;
    
    MainModel.findUsersByIds(ids, (err, docs) => {
        if (err) MyResponse.error(res, err);
        else
            if (docs)
                MyResponse.success(res, docs);
            else
                MyResponse.fail(res);
    });
})

// GET STRANGER
router.get('/getStrangerByUsername', (req, res, next) => {
    const { username } = req.query;
    MainModel.findStrangerByUsername(username, (err, docs) => {
        if (err) MyResponse.error(res, err);
        else
            if (docs)
                MyResponse.success(res, docs);
            else
                MyResponse.fail(res);
    });
})


// LOGIN
router.get('/getUserByUsernameAndPassword', (req, res, next) => {
    const { username, password } = req.query;
    MainModel.findByUsernameAndPassword(username, password, (err, doc) => {
        if (err) MyResponse.error(res, err);
        else
            if (doc)
                MyResponse.success(res, doc);
            else
                MyResponse.fail(res);
    });
})

// DELETE AND CREATE FAKE DATA
router.get('/reset', (req, res) => {
    MainModel.reset((err, result) => {
        res.json(result)
    })
})

router.get('/all', (req, res) => {
    MainModel.listAll((err, result) => {
        res.json(result)
    })
})

// FRIEND ACTIONS
router.post('/sentFriendRequest', (req, res) => {
    const { id, friendId } = req.body;
    if (id && friendId) {
        MainModel.sentFriendRequestById(id, friendId, (err, result) => {
            if (err) MyResponse.error(res, err);
            else
                if (result)
                    MyResponse.success(res, result);
                else
                    MyResponse.fail(res);
        });
    } else {
        MyResponse.fail(res);
    }
})

// RUN ACTION
router.get('/runAction', (req, res) => {
    MainModel.listAll((err, result) => {
        res.json(result)
    })
})
module.exports = router;