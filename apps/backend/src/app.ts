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

app.use('/api/v1/', gameRoutes)

app.use(errorHandler)

export default app
