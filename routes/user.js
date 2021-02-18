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

// LOGIN
router.get('/getUserByUsernameAndPassword', (req, res, next) => {
    const { username, password } = req.query;
    console.log(username, password);

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

module.exports = router;