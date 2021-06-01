const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authentication = require('../middleware/authentication');

const router = express.Router();

router.get('/', authentication.authenticateUser, dashboardController.dashboardIndex);


module.exports = router;
