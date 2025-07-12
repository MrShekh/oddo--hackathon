const User = require('../models/User');

// @desc    Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Update profile (name, location, photo)
// @desc    Update profile (name, location, photo, visibility)
exports.updateProfile = async (req, res) => {
  const {
    name,
    location,
    skillsOffered,
    skillsWanted,
    availability,
    isPublic 
  } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (location) user.location = location;

    if (typeof isPublic !== 'undefined') {
      user.isPublic = isPublic; // <- 👈 toggle visibility
    }

    if (skillsOffered) {
      user.skillsOffered = Array.isArray(skillsOffered)
        ? skillsOffered
        : skillsOffered.split(',').map(skill => skill.trim());
    }

    if (skillsWanted) {
      user.skillsWanted = Array.isArray(skillsWanted)
        ? skillsWanted
        : skillsWanted.split(',').map(skill => skill.trim());
    }

    if (availability) {
      user.availability = Array.isArray(availability)
        ? availability
        : availability.split(',').map(a => a.trim());
    }

    if (req.file) {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/profile_photos/${req.file.filename}`;
      user.profilePhoto = fileUrl;
    }

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};