import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { connectDB } from './config/db.js'; // or default import if you prefer
import Report from './controllers/reportController.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
dotenv.config();


const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/leads', leadRoutes);

// simple reporting endpoint
app.get('/api/reports/leads-by-status', Report.leadsByStatus);

// error handler
app.use(errorHandler);

const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

if (process.env.NODE_ENV !== 'test') {
  console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
const uri = process.env.MONGO_URI;
  connectDB(uri)
  
    .then(() => {
      app.listen(port, () => console.log(`🚀 API listening on port ${port}`));
    })
    .catch(err => {
      console.error('❌ Failed to connect DB', err);
      process.exit(1);
    });
}

export default app;
