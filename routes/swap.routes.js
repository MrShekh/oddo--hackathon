const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const {
  createSwap,
  respondToSwap,
  cancelSwap,
  getMySwaps
} = require('../controllers/swap.controller'); // ✅ Make sure this is correct

// Create a new swap request
router.post('/', protect, createSwap);

// Accept or reject a swap
router.put('/:id/respond', protect, respondToSwap);

// Cancel a swap
router.delete('/:id', protect, cancelSwap);

// Get my swap requests (as requester or recipient)
router.get('/', protect, getMySwaps);

module.exports = router;
