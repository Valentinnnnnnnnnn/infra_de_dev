import { GameRepoImpl } from '../database/repositories/gameRepoImpl'

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
  const game = await gameRepo.createGame(target)
  return game
}
