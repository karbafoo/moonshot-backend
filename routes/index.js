const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const contractRoutes = require('./contract.route');
const budgetRoutes = require('./budget.route');
const financeRoutes = require('./finance.route');
const diplomacyRoutes = require('./diplomacy.route');
const groupRoutes = require('./group.route');
const projectRoutes = require('./project.route');
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/contract', contractRoutes);
router.use('/budget', budgetRoutes);
router.use('/finance', financeRoutes);
router.use('/diplomacy', diplomacyRoutes);
router.use('/group', groupRoutes);
router.use('/project', projectRoutes);

module.exports = router;
