const MyResponse = {
    success: function (res, payload) {
        res.status(200);
        res.json({
            status: 'succeeded',
            payload: payload || {},
        });
    },
    fail: function (res, payload) {
        res.status(200);
        res.json({
            status: 'failed',
            payload: payload || {},
        });
    },
    error: function (res, error) {
        res.status(200);
        res.json({
            status: 'error',
            payload: {},
            error: error || '',
        });
    },
    notFound: function (res, data) {
        res.status(404);
        res.json(data);
    },
}

module.exports = MyResponse;