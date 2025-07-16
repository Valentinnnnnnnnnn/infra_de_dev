import { Request, Response } from 'express'
import * as service from '../services/gameService'
import logger from '../utils/logger'

export async function newGame(req: Request, res: Response) {
  const game = await service.startNewGame()
  logger.debug(`New game created with ID: ${game.id} and target: ${game.target}`)
  res.status(201).json({ gameId: game.id, length: game.target.length, maxGuesses: game.maxGuesses })
}