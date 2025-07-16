import express from 'express';
import gameRoutes from './routes/gameRoutes';
import logger from './utils/logger';

const app = express();


app.use(express.json())

// Middleware logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});