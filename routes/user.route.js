const express = require('express');
const passport = require('passport');
const Websocket = require('../websocket');
const UserController = require('../controllers/user');

const router = express.Router();

router.post(
    '/by-address',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        console.log('body', body);
        UserController.getByAddress(body)
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);
router.get(
    '/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        UserController.getAll()
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);
router.get(
    '/lobby',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        UserController.getUsersById(Websocket.getLobby())
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);

module.exports = router;
