const express = require('express');
const aboutController = require('../controllers/aboutController');
const authorization = require('../middleware/authorization');

const router = express.Router();


/**
 * @swagger
 * /about':
 *  get:
 *    description: Use to render about page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', authorization.checkIfLogged, aboutController.aboutIndex);


module.exports = router;
