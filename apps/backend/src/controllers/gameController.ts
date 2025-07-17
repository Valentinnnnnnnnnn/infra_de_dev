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

export async function getResolvedWord(req: Request, res: Response) {
  const gameId = req.params.id
  try {
    const game = await service.getGameById(gameId)
    logger.debug(`Retrieved game data : ${JSON.stringify(game)}`)
    if (!game) {
      logger.warn(`Game with ID ${gameId} not found`)
      return res.status(404).json({ error: `Game with ID ${gameId} not found` })
    }
    if (!game.finishedAt) {
      logger.warn(`Game with ID ${gameId} is not finished`)
      return res
        .status(400)
        .json({ error: `Game with ID ${gameId} is not finished` })
    }
    res.status(200).json({ resolvedWord: game.target })
  } catch (error: any) {
    logger.error(
      `Error retrieving resolved word for game ${gameId}: ${error.message}`
    )
    res.status(500).json({ error: 'Internal server error' })
  }
}
