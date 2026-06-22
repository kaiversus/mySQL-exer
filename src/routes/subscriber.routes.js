import { Router } from 'express';
import { getAllSubscribers, createSubscriber, deleteSubscriber } from '../controllers/subscriber.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', createSubscriber);
router.get('/', protect, getAllSubscribers);
router.delete('/:id', protect, deleteSubscriber);

export default router;
