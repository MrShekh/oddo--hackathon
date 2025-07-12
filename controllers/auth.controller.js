const User = require('../models/User');
const generateToken = require('../utils/jwt');

// Register (for users only)
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create user
    user = new User({
      name,
      email,
      password,
      role, // either 'admin' or 'user'
      isAdmin: role === 'admin' // automatically set isAdmin true if role is 'admin'
    });

    await user.save();

    const token = generateToken(user._id); // your JWT function
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Login (for users/admins)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({
      message: 'Login successful',
      token: generateToken(user),
      role: user.role
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get current user
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json(user);
};
