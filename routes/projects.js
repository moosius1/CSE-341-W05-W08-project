const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);
router.post('/', projectsController.createNew);
router.put('/:id', projectsController.updateExisting);
router.delete('/:id', projectsController.deleteProject);
module.exports = router;