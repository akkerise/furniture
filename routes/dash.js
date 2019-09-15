const express = require('express');
const router = express.Router();
const auth = require('../app/middlewares/auth');
const DashboardController = require('../app/controllers/DashboardController');

/* dashboard router listing. */
router.get('/', auth.logged, DashboardController.index);

module.exports = router;
