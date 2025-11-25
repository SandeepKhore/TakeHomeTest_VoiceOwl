import app from './app'
import logger from './utils/logger';
import { connectDB } from './db';

const main = async () => {
  const PORT = process.env.PORT || 3000;
  
  await connectDB();
  app.listen(PORT, () => {
    logger.log('Server running on port: ', PORT)
  })
}

main();