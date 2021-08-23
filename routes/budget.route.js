const express = require('express');
const passport = require('passport');
const BudgetController = require('../controllers/budget');

const router = express.Router();

router.post(
    '/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        BudgetController.GetBudget(body)
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
    '/get',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        BudgetController.GetBudgetById(body)
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
        BudgetController.MakeBudget(body)
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
    '/appropriation/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        BudgetController.GetAppropriation(body)
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
    '/appropriation/new',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        BudgetController.MakeAppropriation(body)
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
    '/objective/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        BudgetController.GetObjective(body)
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
    '/objective/new',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        BudgetController.MakeObjective(body)
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
