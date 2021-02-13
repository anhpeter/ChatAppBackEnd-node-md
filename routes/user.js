const express = require('express');
const router = express.Router();

const userModel = require('../app/users/userModel');


router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    let user = userModel.findByUsernameAndPassword(username, password);
    res.json({ status: (user) ? 'success': 'failed', data: { user } });
})
module.exports = router;