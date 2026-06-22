const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/me', protect, adminController.getMe);
router.put('/me', protect, adminController.updateMe);
router.put('/me/password', protect, adminController.changePassword);

module.exports = router;