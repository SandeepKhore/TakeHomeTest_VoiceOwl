import express from 'express';
import router from './routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Added router with versioning
router(app);

export default app;