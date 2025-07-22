const Notification = require('../models/Notification');

// ➤ Admin creates notification
exports.createNotification = async (req, res) => {
  const { message, target } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const notification = new Notification({
      message,
      target: target || 'all',
      createdBy: req.user.id
    });

    await notification.save();

    // Removed real-time socket event

    res.status(201).json({ message: 'Notification created', notification });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ➤ Users get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const role = req.user.role || 'user';

    const notifications = await Notification.find({
      $or: [{ target: 'all' }, { target: role }]
    }).sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
