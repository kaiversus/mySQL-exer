const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();
const subController = require('../controllers/subscriber.controller');

router.post('/', subController.createSubscriber);
router.get('/', protect, subController.getAllSubscribers);
router.delete('/:id', protect, subController.deleteSubscriber);

module.exports = router;