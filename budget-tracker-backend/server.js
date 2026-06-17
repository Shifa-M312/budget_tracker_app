import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.js';
import transactionRoutes from './src/routes/transactions.js';

dotenv.config();
const app = express();


// Middlewares
app.use(cors({
  origin: ['https://vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.options('/*', cors()); 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Routers
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Budget Tracker API Server is online...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Linked and Listening...'))
  .catch(err => console.error('Database configuration connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing seamlessly on port ${PORT}`));
