const express = require('express');
const examsController = require('../controllers/examsController');

const router = express.Router();

router.get('/', examsController.exam_index);
router.get('/create', examsController.exam_create);
router.post('/create', examsController.exam_create_post);
router.get('/:id', examsController.exam_details);
router.delete('/:id', examsController.exam_delete);

module.exports = router;