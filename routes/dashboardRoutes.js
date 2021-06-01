const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/', [authentication.authenticateUser, authorization.checkIfLogged], dashboardController.dashboardIndex);


module.exports = router;
