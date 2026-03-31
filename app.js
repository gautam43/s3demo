const express = require('express');
const path = require('path');

const uploadRoute = require('./routes/upload');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend (UI)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/upload', uploadRoute);

// Health check / root route
app.get('/api', (req, res) => {
  res.json({
    message: 'S3 Upload API Running 🚀'
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});