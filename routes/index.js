const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/projects', require('./projects'));
router.use('/contributors', require('./contributors'));

module.exports = router;