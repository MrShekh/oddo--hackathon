const { Parser } = require('json2csv');
const User = require('../models/User');
const Swap = require('../models/Swap');
const Feedback = require('../models/Feedback');

// ➤ Download Users Report
exports.downloadUsersReport = async (req, res) => {
  try {
    const users = await User.find().select('-password -__v');

    const parser = new Parser({
      fields: ['_id', 'name', 'email', 'role', 'isBanned', 'createdAt']
    });

    const csv = parser.parse(users);

    res.header('Content-Type', 'text/csv');
    res.attachment('users_report.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error generating user report', error: err.message });
  }
};

// ➤ Download Swaps Report
exports.downloadSwapsReport = async (req, res) => {
  try {
    const swaps = await Swap.find()
      .populate('requester', 'name')
      .populate('recipient', 'name');

    const data = swaps.map(swap => ({
      _id: swap._id,
      requester: swap.requester?.name,
      recipient: swap.recipient?.name,
      offeredSkill: swap.offeredSkill,
      requestedSkill: swap.requestedSkill,
      status: swap.status,
      createdAt: swap.createdAt
    }));

    const parser = new Parser({
      fields: ['_id', 'requester', 'recipient', 'offeredSkill', 'requestedSkill', 'status', 'createdAt']
    });

    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('swaps_report.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error generating swaps report', error: err.message });
  }
};

// ➤ Download Feedback Report
exports.downloadFeedbackReport = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('from', 'name')
      .populate('to', 'name');

    const data = feedbacks.map(fb => ({
      _id: fb._id,
      from: fb.from?.name,
      to: fb.to?.name,
      rating: fb.rating,
      comment: fb.comment,
      createdAt: fb.createdAt
    }));

    const parser = new Parser({
      fields: ['_id', 'from', 'to', 'rating', 'comment', 'createdAt']
    });

    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('feedback_report.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error generating feedback report', error: err.message });
  }
};
