const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const {
  banUser,
  unbanUser,
  getAllUsers,
  searchUsersBySkill,
  flagSkill,
  unflagSkill
} = require('../controllers/admin.controller');

router.use(protect, isAdmin); // all admin routes need admin

router.put('/users/:userId/ban', banUser);
router.put('/users/:userId/unban', unbanUser);
router.get('/users', getAllUsers);
router.get('/search-skill', searchUsersBySkill);          // GET /api/admin/search-skill?skill=excel
router.put('/users/:userId/flag-skill', flagSkill);       // PUT /api/admin/users/:userId/flag-skill
router.put('/users/:userId/unflag-skill', unflagSkill);   // PUT /api/admin/users/:userId/unflag-skill

module.exports = router;
