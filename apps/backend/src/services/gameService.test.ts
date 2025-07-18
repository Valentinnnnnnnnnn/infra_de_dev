import { chooseRandomTarget, startNewGame, getGameById } from './gameService'

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
  'peche',
  'abricot',
  'melon',
  'pasteque',
  'framboise',
  'myrtille',
  'cassis',
  'groseille',
  'clementine',
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
  expect(game).toHaveProperty('maxGuesses')

  expect(validTargets).toContain(game.target)
  expect(game.maxGuesses).toBeGreaterThan(0)
})

test('getGameById retrieves a game by ID', async () => {
  const game = await startNewGame()
  const retrievedGame = await getGameById(game.id)

  expect(retrievedGame).toHaveProperty('id', game.id)
  expect(retrievedGame).toHaveProperty('target', game.target)
  expect(retrievedGame).toHaveProperty('maxGuesses', game.maxGuesses)
  expect(retrievedGame).toHaveProperty('finishedAt', null)
})

test('getGameById throws an error for non-existent game', async () => {
  await expect(getGameById('non-existent-id')).rejects.toThrow(
    'Game with ID non-existent-id not found'
  )
})
