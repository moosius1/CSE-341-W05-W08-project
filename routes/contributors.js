const express = require('express');
const router = express.Router();

const contributorsController = require('../controllers/contributors');

router.get('/', contributorsController.getAll);
router.get('/:id', contributorsController.getSingle);
router.post('/', contributorsController.createNew);
router.put('/:id', contributorsController.updateExisting);
router.delete('/:id', contributorsController.deleteContributor);
module.exports = router;