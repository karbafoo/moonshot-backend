const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/nonce/:addr', (req, res, next) => {
    const body = req.params || {};
    UserController.getNonceForAddress(body.addr)
        .then((nonce) => {
            console.log('nonce', nonce);
            res.json({nonce: nonce});
        })
        .catch((err) => {
            console.log(err);
            res.status(406).send('ERROR');
        });
});

router.post('/login', (req, res, next) => {
    const body = req.body || {};
    UserController.Authenticate(body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(406).send('ERROR');
        });
});

module.exports = router;
