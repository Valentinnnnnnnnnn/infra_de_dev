import {
  newGuess,
  calculateGuessResult,
  getAllGuessesByGameId,
} from './guessService'

test('calculateGuessResult should return correct results', async () => {
  const guess = 'apple'
  const target = 'grape'
  const result = await calculateGuessResult(guess, target)

  expect(result).toEqual(['present', 'present', 'present', 'absent', 'correct'])
})

test('calculateGuessResult should handle mix of upper and lower case letters', async () => {
  const guess = 'ApPlE'
  const target = 'grape'
  const result = await calculateGuessResult(guess, target)
  expect(result).toEqual(['present', 'present', 'present', 'absent', 'correct'])
})

test('newGuess should not create a new guess, gameId do not exist', async () => {
  const gameId = 'non-existent-id'
  const guess = 'apple'

  await expect(newGuess(gameId, guess)).rejects.toThrow(
    'Game with ID non-existent-id not found'
  )
})

test('getAllGuessesByGameId should return all guesses for a game (empty Array in this case)', async () => {
  const gameId = 'test-game-id'

  jest.spyOn(require('./gameService'), 'getGameById').mockResolvedValue({
    id: gameId,
    target: 'grape',
    maxGuesses: 6,
  })

  const guesses = await getAllGuessesByGameId(gameId)

  expect(guesses).toBeInstanceOf(Array)
  expect(guesses.length).toBeGreaterThanOrEqual(0)
})
