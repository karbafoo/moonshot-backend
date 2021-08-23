const express = require('express');
const passport = require('passport');
const {ProjectController} = require('../controllers/hr');

const router = express.Router();

router.get(
    '/',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        ProjectController.GetProjects(body)
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

        ProjectController.Make(body)
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

        ProjectController.Update(body)
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
    '/by-name',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        ProjectController.GetProjectByName(body)
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
