import { Request, Response } from 'express'
import logger from '../utils/logger'
import * as service from '../services/guessService'

export async function newGuess(req: Request, res: Response, next: Function) {
  const gameId = req.query.gameId as string
  const guess = req.query.guess as string
  logger.debug(`New guess received for game ID: ${gameId} with guess: ${guess}`)
  try {
    const newGuess = await service.newGuess(gameId, guess)
    logger.debug(`New guess created with ID: ${newGuess.id}`)
    res.status(201).json(newGuess)
  } catch (error: any) {
    logger.error(`Error creating new guess: ${error.message}`)
    next(error)
  }
}

export async function getGuesses(req: Request, res: Response, next: Function) {
  const gameId = req.params.gameId
  logger.debug(`Retrieving guesses for game ID: ${gameId}`)
  try {
    const guesses = await service.getAllGuessesByGameId(gameId)
    logger.debug(`Retrieved ${guesses.length} guesses for game ID: ${gameId}`)
    res.status(200).json(guesses)
  } catch (error: any) {
    logger.error(
      `Error retrieving guesses for game ID ${gameId}: ${error.message}`
    )
    next(error)
  }
}
