import { Request, Response } from 'express'
import * as service from '../services/gameService'
import logger from '../utils/logger'

export async function newGame(req: Request, res: Response) {
  const game = await service.startNewGame()
  logger.debug(
    `New game created with ID: ${game.id} and target: ${game.target}`
  )
  res.status(201).json({
    gameId: game.id,
    length: game.target.length,
    maxGuesses: game.maxGuesses,
  })
}

export async function getGame(req: Request, res: Response) {
  const gameId = req.params.id
  try {
    const game = await service.getGameById(gameId)
    logger.debug(`Retrieved game with ID: ${game.id}`)
    if (game.finishedAt) {
      logger.debug(`Game with ID ${game.id} is finished`)
      throw new Error(`Game with ID ${gameId} is already finished`)
    }
    res.status(200).json({
      gameId: game.id,
      maxGuesses: game.maxGuesses,
      length: game.target.length,
    })
  } catch (error: any) {
    logger.error(`Error retrieving game with ID ${gameId}: ${error.message}`)
    throw new Error(`Game with ID ${gameId} not found`)
  }
}
