import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  database_url: string
  log_folder: string
  log_level: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  database_url:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/find_the_word',
  log_folder: process.env.LOG_FOLDER || '/var/log/find_the_word',
  log_level: (process.env.LOG_LEVEL || 'debug').toLowerCase(),
}

export default config
