const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');

const {
  downloadUsersReport,
  downloadSwapsReport,
  downloadFeedbackReport
} = require('../controllers/report.controller');

router.use(protect, isAdmin);

// Routes to download reports
router.get('/users', downloadUsersReport);
router.get('/swaps', downloadSwapsReport);
router.get('/feedbacks', downloadFeedbackReport);

module.exports = router;
