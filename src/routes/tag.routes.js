const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', tagController.getAllTags);
router.post('/', protect, tagController.createTag);
router.put('/:id', protect, tagController.updateTag);
router.delete('/:id', protect, tagController.deleteTag);
module.exports = router;