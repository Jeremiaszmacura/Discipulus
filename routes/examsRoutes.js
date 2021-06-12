const express = require('express');
const examsController = require('../controllers/examsController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const router = express.Router();


/**
 * @swagger
 * /exams':
 *  get:
 *    description: Use to render page showing all exams (only admin allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', authorization.checkIfLogged, examsController.examIndex);

/**
 * @swagger
 * /exams/create':
 *  get:
 *    description: Use to render create exam page (only logged in users allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/create', [authentication.authenticateUser, authorization.checkIfLogged], examsController.examCreate);

/**
 * @swagger
 * /exams/create':
 *  post:
 *    description: Use to pass data of creating exam (only logged in users allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/create', [authentication.authenticateUser, authorization.checkIfLogged], examsController.examCreatePost);

/**
 * @swagger
 * /exams/createQuestion/:id':
 *  get:
 *    description: Use to render page of creating question to exam (only logged in users allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/createQuestion/:id', authorization.checkIfLogged, examsController.questionCreate);

/**
 * @swagger
 * /exams/createQuestion/:id':
 *  post:
 *    description: Use to pass data of creating question to exam (only logged in users allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/createQuestion/:id', authorization.checkIfLogged, examsController.questionCreatePost);

/**
 * @swagger
 * /exams/question/:id':
 *  delete:
 *    description: Use to delete question from exam (only exams owners or admins allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/question/:id', [authentication.authenticateUser, authorization.isExamOwnerOrAdmin,
    authorization.checkIfLogged], examsController.questionDelete);

/**
 * @swagger
 * /exams/:id':
 *  get:
 *    description: Use to render exam details page (only exams owners or admins allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', authorization.checkIfLogged, examsController.examDetails);

/**
 * @swagger
 * /exams/:id':
 *  delete:
 *    description: Use to delete exam (only exams owners or admins allowed)
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:id', [authentication.authenticateUser, authorization.isExamOwnerOrAdmin,
    authorization.checkIfLogged], examsController.examDelete);


module.exports = router;
