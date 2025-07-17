import { GuessRepoImpl } from '../database/repositories/guessRepoImpl'
import { getGameById, updateGameStatus } from './gameService'
import logger from '../utils/logger'

const guessRepo = new GuessRepoImpl()

export async function calculateGuessResult(
  guess: string,
  target: string
): Promise<('correct' | 'present' | 'absent')[]> {
  const guessUpper = guess.toUpperCase()
  const targetUpper = target.toUpperCase()

  const result = Array(guessUpper.length).fill('absent')
  for (let i = 0; i < guessUpper.length; i++) {
    if (guessUpper[i] === targetUpper[i]) {
      result[i] = 'correct'
    } else if (targetUpper.includes(guessUpper[i])) {
      result[i] = 'present'
    } else {
      result[i] = 'absent'
    }
  }

  return result
}

export async function newGuess(gameId: string, guess: string) {
  const game = await getGameById(gameId)
  logger.debug(`Creating new guess for game ID: ${gameId} with guess: ${guess}`)

  if (!game) {
    logger.error(`Game with ID ${gameId} not found`)
    throw new Error(`Game with ID ${gameId} not found`)
  }

  if (game.finishedAt) {
    logger.error(`Game with ID ${gameId} is already finished`)
    throw new Error(`Game with ID ${gameId} is already finished`)
  }

  if (guess.length !== game.target.length) {
    logger.error(
      `Guess length does not match target length for game ID ${gameId}`
    )
    throw new Error(
      `Guess length does not match target length for game ID ${gameId}`
    )
  }

  const result = await calculateGuessResult(guess, game.target)
  const newGuess = await guessRepo.createGuess(gameId, guess, result)
  logger.debug(`New guess created with ID: ${newGuess.id}`)

  if (result.every((status) => status === 'correct')) {
    logger.debug(`Game with ID ${gameId} finished successfully`)
    await updateGameStatus(gameId)
  }

  return newGuess
}

export async function getAllGuessesByGameId(gameId: string) {
  logger.debug(`Retrieving all guesses for game ID: ${gameId}`)
  const game = await getGameById(gameId)
  if (!game) {
    logger.error(`Game with ID ${gameId} not found`)
    throw new Error(`Game with ID ${gameId} not found`)
  }

  const guesses = await guessRepo.getAllGuessesByGameId(gameId)
  if (guesses.length === 0) {
    logger.warn(`No guesses found for game ID: ${gameId}`)
  }
  return guesses
}
