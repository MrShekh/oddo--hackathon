const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  location: {
    type: String,
    default: ''
  },
  profilePhoto: {
    type: String,
    default: '' // can store image URL or path if uploading later
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  skillsOffered: {
  type: [String],
  default: []
},
skillsWanted: {
  type: [String],
  default: []
},
availability: {
  type: [String], // e.g., ['Weekends', 'Evenings']
  default: []
}
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password
UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
