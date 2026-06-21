const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router;