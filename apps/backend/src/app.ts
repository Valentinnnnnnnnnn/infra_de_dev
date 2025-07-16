import express from 'express'
import gameRoutes from './routes/gameRoutes'
import { errorHandler } from './middlewares/errorHandler'
import logger from './utils/logger'

const app = express()

app.use(express.json())

// logger
app.use((req, res, next) => {
  logger.debug(`Request: ${req.method} ${req.originalUrl}`)
  next()
})

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Game routes
app.use('/api/v1/', gameRoutes)

app.use(errorHandler)

export default app