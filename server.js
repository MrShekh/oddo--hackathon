const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Load env vars
dotenv.config();

// Import DB connection
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const searchRoutes = require('./routes/search.routes');
const swapRoutes = require('./routes/swap.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const adminRoutes = require('./routes/admin.routes');
const notificationRoutes = require('./routes/notification.routes');
const reportRoutes = require('./routes/report.routes');

// Connect to DB
connectDB();

// Init app
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',        // frontend dev
  'https://skill-swap-admin.netlify.app'      // frontend prod
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// User APIs
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Admin APIs
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Skill Swap API is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
