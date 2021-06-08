const express = require('express');
const usersController = require('../controllers/usersController');
const validate = require('../middleware/validation');
const authorization = require('../middleware/authorization');

const router = express.Router();


/**
 * @swagger
 * /users/register:
 *  get:
 *    description: Use to render register page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/register', authorization.checkIfLogged, usersController.registerIndex);

/**
 * @swagger
 * /users/register:
 *  post:
 *    description: Use to pass register data
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/register', authorization.checkIfLogged, validate.register_validation, usersController.registerPost);

/**
 * @swagger
 * /users/login':
 *  get:
 *    description: Use to render login page
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/login', authorization.checkIfLogged, usersController.loginIndex);

/**
 * @swagger
 * /users/logout':
 *  get:
 *    description: Use to logout user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/logout',  usersController.logout);

/**
 * @swagger
 * /users/login':
 *  post:
 *    description: Use to pass login data
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', authorization.checkIfLogged, usersController.loginPost);


module.exports = router;
