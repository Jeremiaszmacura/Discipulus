const express = require('express');
const solutionsController = require('../controllers/examsController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

const router = express.Router();

router.get('/personalInformation/:id', authorization.checkIfLogged, solutionsController.examIndex);


module.exports = router;
