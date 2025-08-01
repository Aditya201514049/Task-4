const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Configure CORS using environment variables
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local frontend development
    'http://localhost:3000',
    'https://task-4-e5ia.onrender.com',
    process.env.FRONTEND_URL // Your hosted frontend from .env
  ].filter(Boolean), // Remove any undefined values
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("Task 4 API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
