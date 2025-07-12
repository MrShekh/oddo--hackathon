const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/search?skill=Photoshop
router.get('/', async (req, res) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ message: 'Skill query is required' });
  }

  try {
    const regex = new RegExp(skill, 'i'); // Case-insensitive match

    const users = await User.find({
      $or: [
        { skillsOffered: { $regex: regex } },
        { skillsWanted: { $regex: regex } }
      ]
    }).select('-password'); // hide password in result

    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
