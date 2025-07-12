const Feedback = require('../models/Feedback');
const Swap = require('../models/Swap');
const User = require('../models/User');

// ➤ Create feedback for an accepted swap
exports.giveFeedback = async (req, res) => {
  const { swapId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const swap = await Swap.findById(swapId);
    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Only participants can give feedback
    const isParticipant =
      swap.requester.toString() === req.user.id || swap.recipient.toString() === req.user.id;

    if (!isParticipant) {
      return res.status(403).json({ message: 'You are not part of this swap' });
    }

    // Only for accepted swaps
    if (swap.status !== 'accepted') {
      return res.status(400).json({ message: 'Feedback allowed only on accepted swaps' });
    }

    // Set who the feedback is for
    const to = swap.requester.toString() === req.user.id
      ? swap.recipient
      : swap.requester;

    // Prevent duplicate feedback
    const alreadyGiven = await Feedback.findOne({
      from: req.user.id,
      swapId
    });

    if (alreadyGiven) {
      return res.status(409).json({ message: 'You have already given feedback for this swap' });
    }

    const feedback = new Feedback({
      from: req.user.id,
      to,
      swapId,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted', feedback });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ➤ Get feedbacks for a user (as recipient)
exports.getFeedbacksForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const feedbacks = await Feedback.find({ to: userId })
      .populate('from', 'name profilePhoto')
      .populate('swapId', 'offeredSkill requestedSkill status');

    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
