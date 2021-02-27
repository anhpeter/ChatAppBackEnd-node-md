const express = require('express');
const Helper = require('../app/defines/Helper');
const ErrorMessage = require('../app/defines/Messages/ErrorMessage');
const MyResponse = require('../app/defines/MyResponse');
const router = express.Router();
const MainModel = require('../app/models/conversation');

// GET =======================
router.get('/all', (req, res) => {
    MainModel.listAll((err, result) => {
        res.json(result)
    })
})

router.post('/getConversationInfoByUserIdsOrCreateIfNotExist', (req, res) => {
    const { ids } = req.body;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findInfoByUserIdsOrCreateIfNotExist(ids, (err, result) => {
            if (err) {
                MyResponse.error(res, err);
            }
            else
                if (result) {
                    MyResponse.success(res, result);
                }
                else
                    MyResponse.fail(res);
        });
    }, ids)
})

router.get('/getConversationById', (req, res) => {
    const { id } = req.query;
    Helper.runIfParamsNotNull(res, () => {
        MainModel.findById(id, (err, doc) => {
            if (err) {
                MyResponse.error(res, err);
            }
            else
                if (doc)
                    MyResponse.success(res, doc);
                else
                    MyResponse.fail(res);
        });
    }, id)
})

router.get('/home', (req, res) => {
    MainModel.findBySpecialName((err, result) => {
        if (err) {
            MyResponse.error(res, err);
        }
        else
            if (result)
                MyResponse.success(res, result);
            else
                MyResponse.fail(res);
    });
})

router.get('/reset', (req, res) => {
    MainModel.reset((err, result) => {
        res.json(result)
    })
})

module.exports = router;