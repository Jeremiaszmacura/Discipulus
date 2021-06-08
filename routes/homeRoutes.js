const express = require('express');
const homeController = require('../controllers/homeController');
const authorization = require('../middleware/authorization');

const router = express.Router();


/**
 * @swagger
 * /:
 *  get:
 *    description: Use to render home page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', authorization.checkIfLogged, homeController.homeIndex);

/**
 * @swagger
 * /:
 *  post:
 *    description: Use to render starting test page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', authorization.checkIfLogged, homeController.homePostCode);


module.exports = router;
