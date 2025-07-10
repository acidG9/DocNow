import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// DB Connect
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// Later: /api/appointments, /api/patient, /api/doctor

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
