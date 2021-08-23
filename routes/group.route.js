const express = require('express');
const passport = require('passport');
const {GroupController} = require('../controllers/hr');

const router = express.Router();

router.get(
    '/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        console.log('body');
        GroupController.GetGroups(body)
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);

router.post(
    '/new',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        GroupController.Make(body)
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);

router.post(
    '/update',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        GroupController.Update(body)
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);

router.post(
    '/by-role',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        GroupController.GetGroupByRole(body)
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
