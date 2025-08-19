import express, { Express } from 'express';
import cors from 'cors';
import listingsRouter from './routes/listings';

export function createServer(): Express {
  const app = express();

  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/listings', listingsRouter);

  return app;
}
