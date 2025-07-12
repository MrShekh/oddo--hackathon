const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/user.controller');
const protect = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/profile', protect, getProfile);

// Upload single file named "profilePhoto"
router.put('/profile', protect, upload.single('profilePhoto'), updateProfile);

module.exports = router;
