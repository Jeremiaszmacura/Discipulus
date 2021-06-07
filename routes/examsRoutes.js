const express = require('express');
const examsController = require('../controllers/examsController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/', authorization.checkIfLogged, examsController.examIndex);
router.get('/create', [authentication.authenticateUser, authorization.checkIfLogged], examsController.examCreate);
router.post('/create', [authentication.authenticateUser, authorization.checkIfLogged], examsController.examCreatePost);
router.get('/createQuestion/:id', authorization.checkIfLogged, examsController.questionCreate);
router.post('/createQuestion/:id', authorization.checkIfLogged, examsController.questionCreatePost);
router.delete('/question/:id', [authentication.authenticateUser, authorization.checkIfLogged,
    authorization.isExamOwnerOrAdmin], examsController.questionDelete)
router.get('/:id', authorization.checkIfLogged, examsController.examDetails);
router.delete('/:id', [authentication.authenticateUser, authorization.checkIfLogged,
    authorization.isExamOwnerOrAdmin], examsController.examDelete);


module.exports = router;
