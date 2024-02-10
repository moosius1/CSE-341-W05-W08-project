const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/projects', require('./projects'));

module.exports = router;