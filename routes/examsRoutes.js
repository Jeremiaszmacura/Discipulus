const express = require('express');
const examsController = require('../controllers/examsController');
const authentication = require('../middleware/authentication');

const router = express.Router();

router.get('/', examsController.examIndex);
router.get('/create', authentication.authenticateUser, examsController.examCreate);
router.post('/create', authentication.authenticateUser, examsController.examCreatePost);
router.get('/createQuestion/:id', examsController.questionCreate);
router.post('/createQuestion/:id', examsController.questionCreatePost);
router.delete('/question/:id', authentication.authenticateUser, examsController.questionDelete)
router.get('/:id', examsController.examDetails);
router.delete('/:id', authentication.authenticateUser, examsController.examDelete);


module.exports = router;