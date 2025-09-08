const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

const routeTasks = require('./routes/tasks');

app.use(express.json());

// Serve React frontend build (optional, if you want combined deploy)
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.use('/api/tasks', routeTasks);

// All other routes serve React app (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});