import { Router } from 'express';
import { getMe, updateMe, changePassword } from '../controllers/admin.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.put('/me/password', protect, changePassword);

export default router;
