const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const router = express.Router();


/**
 * @swagger
 * /dashboard':
 *  get:
 *    description: Use to render dashboard page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', [authentication.authenticateUser, authorization.checkIfLogged], dashboardController.dashboardIndex);


module.exports = router;
