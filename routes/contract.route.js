const express = require('express');
const passport = require('passport');
const ContractController = require('../controllers/contract');

const router = express.Router();
router.post(
    '/new',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.Make(body)
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
    '/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.GetUniqueContracts(body)
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);

//TODO admin
router.post(
    '/history',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.GetContractHistorys(body)
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
        ContractController.GetContractByName(body)
            .then((result) => {
                res.json({result: result});
            })
            .catch((err) => {
                console.log(err);
                res.status(406).send('ERROR');
            });
    }
);
///////////////
router.post(
    '/tokens/history',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.GetERC20TokenHistory(body)
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
    '/tokens/query',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.GetUniqueERC20Tokens(body)
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
    '/tokens/get',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.GetERC20TokenByName(body)
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
    '/tokens/new',
    passport.authenticate('jwt.user', {session: false}),
    (req, res, next) => {
        const body = req.body || {};
        ContractController.MakeERC20Token(body)
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
