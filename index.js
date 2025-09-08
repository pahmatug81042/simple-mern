const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db'); 
const cors = require('cors');
const routeTasks = require('./src/routes/tasks'); 

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(cors({
  origin: 'https://simple-mern-frontend-mucn.onrender.com'
}));

/* // Serve React frontend build
app.use(express.static(path.join(__dirname, 'client/build'))); */

app.get('/', (req, res) => {
  res.send("Simple Mern Backend API Is Running...");
});

// API routes
app.use('/api/tasks', routeTasks);

/* // For client-side routing: serve React index.html on all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});