const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const protect = require('../middlewares/auth.middleware');

router.post('/register', register); // Only for regular users
router.post('/login', login);
router.get('/me', protect, getProfile);

module.exports = router;
