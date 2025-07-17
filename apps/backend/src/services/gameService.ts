import { GameRepoImpl } from '../database/repositories/gameRepoImpl'
import logger from '../utils/logger'

const gameRepo = new GameRepoImpl()

export async function chooseRandomTarget() {
  const targets = [
    'pomme',
    'banane',
    'orange',
    'kiwi',
    'fraise',
    'mangue',
    'ananas',
    'raisin',
    'cerise',
    'pêche',
    'abricot',
    'melon',
    'pastèque',
    'framboise',
    'myrtille',
    'cassis',
    'groseille',
    'clémentine',
    'mandarine',
  ] //! To be replaced with database query
  const randomIndex = Math.floor(Math.random() * targets.length)
  return targets[randomIndex]
}

export async function startNewGame() {
  const target = await chooseRandomTarget()
  logger.debug(`Chosen target for new game: ${target}`)
  const game = await gameRepo.createGame(target)
  logger.debug(
    `Service - Game created with ID: ${game.id} and target: ${game.target}`
  )
  return game
}

export async function getGameById(gameId: string) {
  const game = await gameRepo.getGameById(gameId)
  if (!game) {
    logger.warn(`Game with ID ${gameId} not found`)
    throw new Error(`Game with ID ${gameId} not found`)
  }
  return game
}

export async function updateGameStatus(gameId: string) {
  const game = await getGameById(gameId)
  if (!game) {
    logger.warn(`Game with ID ${gameId} not found for status update`)
    throw new Error(`Game with ID ${gameId} not found`)
  }
  const updatedGame = await gameRepo.updateGame(gameId, {
    finishedAt: new Date(),
  })
  logger.debug(`Game with ID ${gameId} updated to finished`)
  return updatedGame
}
