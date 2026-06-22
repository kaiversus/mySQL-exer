const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();
const profileController = require('../controllers/profile.controller');

router.get('/', profileController.getProfile);
router.put('/', protect, profileController.updateProfile);
module.exports = router;