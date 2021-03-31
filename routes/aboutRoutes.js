const express = require('express');
const aboutController = require('../controllers/aboutController');

const router = express.Router();

router.get('/', aboutController.about_index);

module.exports = router;