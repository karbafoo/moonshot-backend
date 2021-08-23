const express = require('express');
const passport = require('passport');
const {
    BallotController,
    ParticipantController,
    VoteController,
} = require('../controllers/diplomacy');

const router = express.Router();

router.get(
    '/ballot',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};

        BallotController.GetContract(body)
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

        BallotController.Make(body)
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
