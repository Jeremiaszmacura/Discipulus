const express = require('express');
const solutionsController = require('../controllers/solutionsController');
const authorization = require('../middleware/authorization');

const router = express.Router();

/**
 * @swagger
 * /solutions/personalInformation/:id:
 *  get:
 *    description: Use to render solving test page, where we put user details
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/personalInformation/:id', authorization.checkIfLogged, solutionsController.personalInformationGet);

/**
 * @swagger
 * /solutions/personalInformation/:id:
 *  post:
 *    description: Use to pass details of user who takes the test
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/personalInformation/:id', authorization.checkIfLogged, solutionsController.personalInformationPost);


module.exports = router;
