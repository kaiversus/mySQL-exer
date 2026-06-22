import { Router } from 'express';
import { getAllTags, createTag, updateTag, deleteTag } from '../controllers/tag.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllTags);
router.post('/', protect, createTag);
router.put('/:id', protect, updateTag);
router.delete('/:id', protect, deleteTag);

export default router;
