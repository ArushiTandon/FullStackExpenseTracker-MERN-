const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../middlewares/jwt');
const { getDashboardData } = require('../controllers/dashboardController');

router.get('/', jwtAuthMiddleware, getDashboardData);

module.exports = router;