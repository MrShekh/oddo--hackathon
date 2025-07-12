const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');

const {
  createNotification,
  getNotifications
} = require('../controllers/notification.controller');

// Public notifications for all users
router.get('/', protect, getNotifications);

// Only admin can create notifications
router.post('/', protect, isAdmin, createNotification);

module.exports = router;
