// The application, given to you except for Task 2.
//
// The app is created here and started in index.ts.

import express from 'express';
import { instructorsRouter } from './routes/instructors.js';

export const app = express();

app.use(express.json());

// One line per request, for example:  GET /instructors
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/instructors', instructorsRouter);

// Anything that matched no route above lands here.
app.use((_req, res) => {
  res.status(404).json({ error: 'no such endpoint' });
});

// --- Task 2. One error handler for the whole API ---
//
// TODO: app.use(...)
