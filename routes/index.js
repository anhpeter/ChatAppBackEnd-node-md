var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let jsonResult = {
        status: 'success',
        data: {
            message: 'Api for chat app',
        },
    }
    res.status(200);
    res.json(jsonResult);
});

module.exports = router;
