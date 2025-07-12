const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const { giveFeedback, getFeedbacksForUser } = require('../controllers/feedback.controller');

// Give feedback for a swap
router.post('/:swapId', protect, giveFeedback);

// Get all feedbacks for a user
router.get('/user/:userId', protect, getFeedbacksForUser);

module.exports = router;
