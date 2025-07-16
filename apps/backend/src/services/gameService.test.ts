import { chooseRandomTarget, startNewGame } from './gameService'

const validTargets = [
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
]

test('chooseRandomTarget returns a valid target', async () => {
  const target = await chooseRandomTarget()
  expect(validTargets).toContain(target)
})

test('startNewGame creates a game with a valid target', async () => {
  const game = await startNewGame()
  expect(game).toHaveProperty('id')
  expect(game).toHaveProperty('target')
  expect(validTargets).toContain(game.target)
})
