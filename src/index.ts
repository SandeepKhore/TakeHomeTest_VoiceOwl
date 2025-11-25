import express , { Request, Response } from 'express';
import Logger from './utils/logger';

const logger = new Logger();

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  logger.log('Server running on port: ', PORT)
})