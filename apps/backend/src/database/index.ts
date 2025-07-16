import { PrismaClient, Prisma } from '@prisma/client'
import logger from '../utils/logger'

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'info' | 'warn' | 'error'
> | null = null


export function getDatabase() {
  if (!prisma) {
    prisma = new PrismaClient<
      Prisma.PrismaClientOptions,
      'query' | 'info' | 'warn' | 'error'
    >({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    })

    prisma.$on('query', (e: Prisma.QueryEvent) => {
      logger.debug(
        `Query: ${e.query} - Params: ${e.params} - Duration: ${e.duration}ms`
      )
    })
    prisma.$on('info', (e: Prisma.LogEvent) => {
      logger.info(`Prisma Info: ${e.message}`)
    })
    prisma.$on('warn', (e: Prisma.LogEvent) => {
      logger.warn(`Prisma Warning: ${e.message}`)
    })
    prisma.$on('error', (e: Prisma.LogEvent) => {
      logger.error(`Prisma Error: ${e.message}`)
    })
  }
  return prisma
}

export async function initializeDatabase(): Promise<void> {
  getDatabase()
  logger.info('Prisma client initialized')
}