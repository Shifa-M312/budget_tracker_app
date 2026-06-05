import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactions.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Budget Tracker API Server is online...');
});

export default app;
