import express from 'express';
import gameRoutes from './routes/gameRoutes';
import logger from './utils/logger';
import { initializeDatabase } from './database';

const app = express();


app.use(express.json())

// Middleware logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/game', gameRoutes);


// Initialize the database
initializeDatabase()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});