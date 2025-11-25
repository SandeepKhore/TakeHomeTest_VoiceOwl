import express from 'express';
import logger from './utils/logger';
import router from './routes';
import { connectDB } from './db';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Added router with versioning
router(app);

app.use(express.json());

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.log('Server running on port: ', PORT)
  })
})();
