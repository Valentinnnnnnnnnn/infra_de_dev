import fs from 'fs'
import DailyRotateFile from 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'

const logFolder = process.env.LOG_FOLDER || '/var/log/find_the_word'
if (!fs.existsSync(logFolder)) fs.mkdirSync(logFolder, { recursive: true })

const dailyRotateTransport = new DailyRotateFile({
  dirname: logFolder,
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '50m',
  maxFiles: '365d',
})

const level = (process.env.LOG_LEVEL || 'debug').toLowerCase()
const logger = createLogger({
  level,
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    dailyRotateTransport,
    new transports.Console(), // Also log to console
  ],
})

export default logger
