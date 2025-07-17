import express from 'express'
import gameRoutes from './routes/gameRoutes'
import { errorHandler } from './middlewares/errorHandler'
import logger from './utils/logger'
import guessRoutes from './routes/guessRoutes'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

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
app.use('/api/v1/game/', gameRoutes)
app.use('/api/v1/guess/', guessRoutes)

app.use(errorHandler)

export default app
