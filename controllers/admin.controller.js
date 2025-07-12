const User = require('../models/User');

// ➤ Ban a user
exports.banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isBanned: true }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User banned', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ➤ Unban a user
exports.unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isBanned: false }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User unbanned', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ➤ Get all users with optional filter
exports.getAllUsers = async (req, res) => {
  const { banned } = req.query;
  const filter = {};

  if (banned === 'true') filter.isBanned = true;
  if (banned === 'false') filter.isBanned = false;

  try {
    const users = await User.find(filter).select('-password');
    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// ➤ View users with specific skill (in offered or wanted)
exports.searchUsersBySkill = async (req, res) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ message: 'Skill query is required' });
  }

  try {
    const regex = new RegExp(skill, 'i');

    const users = await User.find({
      $or: [
        { skillsOffered: { $regex: regex } },
        { skillsWanted: { $regex: regex } }
      ]
    }).select('-password');

    res.json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ➤ Flag a user's specific skill
exports.flagSkill = async (req, res) => {
  const { userId } = req.params;
  const { skill } = req.body;

  if (!skill) return res.status(400).json({ message: 'Skill is required' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Add to flaggedSkills if not already present
    if (!user.flaggedSkills.includes(skill)) {
      user.flaggedSkills.push(skill);
      await user.save();
    }

    res.json({ message: 'Skill flagged', flaggedSkills: user.flaggedSkills });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ➤ Remove a flagged skill (if admin clears it later)
exports.unflagSkill = async (req, res) => {
  const { userId } = req.params;
  const { skill } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.flaggedSkills = user.flaggedSkills.filter(s => s !== skill);
    await user.save();

    res.json({ message: 'Skill unflagged', flaggedSkills: user.flaggedSkills });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
