const Swap = require('../models/Swap');
const User = require('../models/User');

// Create a new skill swap request
exports.createSwap = async (req, res) => {
  const { recipientId, offeredSkill, requestedSkill } = req.body;

  if (!recipientId || !offeredSkill || !requestedSkill) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Prevent sending request to self
    if (recipientId === req.user.id) {
      return res.status(400).json({ message: 'You cannot send a request to yourself' });
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    // Check if a pending request already exists
    const alreadyExists = await Swap.findOne({
      requester: req.user.id,
      recipient: recipientId,
      offeredSkill,
      requestedSkill,
      status: 'pending'
    });

    if (alreadyExists) {
      return res.status(409).json({ message: 'Similar pending request already exists' });
    }

    const swap = new Swap({
      requester: req.user.id,
      recipient: recipientId,
      offeredSkill,
      requestedSkill
    });

    await swap.save();

    res.status(201).json({ message: 'Swap request sent successfully', swap });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.respondToSwap = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  if (!['accept', 'reject'].includes(action)) {
    return res.status(400).json({ message: 'Invalid action. Use accept or reject.' });
  }

  try {
    const swap = await Swap.findById(id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Only recipient can respond
    if (swap.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to respond to this swap' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: `Swap already ${swap.status}` });
    }

    swap.status = action === 'accept' ? 'accepted' : 'rejected';
    await swap.save();

    res.json({ message: `Swap request ${swap.status}`, swap });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.cancelSwap = async (req, res) => {
  const { id } = req.params;

  try {
    const swap = await Swap.findById(id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap not found' });
    }

    // Only requester can cancel
    if (swap.requester.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not allowed to cancel this swap' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: `Cannot cancel a ${swap.status} swap` });
    }

    swap.status = 'cancelled';
    await swap.save();

    res.json({ message: 'Swap request cancelled', swap });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getMySwaps = async (req, res) => {
  const userId = req.user.id;
  const { status, role } = req.query;

  try {
    let filter = {};

    // Include user as requester or recipient
    if (role === 'requester') {
      filter.requester = userId;
    } else if (role === 'recipient') {
      filter.recipient = userId;
    } else {
      filter.$or = [{ requester: userId }, { recipient: userId }];
    }

    // Optional status filter
    if (status) {
      filter.status = status;
    }

    const swaps = await Swap.find(filter)
      .populate('requester', 'name email profilePhoto')
      .populate('recipient', 'name email profilePhoto')
      .sort({ createdAt: -1 });

    res.json({ swaps });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
