import type { LetterStatus } from '../types/game'

export const MAX_GUESSES = 6

export const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

export const isValidWord = (word: string, length: number): boolean => {
  return word.length === length && /^[A-Z]+$/.test(word)
}

export const createEmptyBoard = (length: number): string[][] => {
  return Array(MAX_GUESSES)
    .fill(null)
    .map(() => Array(length).fill(''))
}

export const updateKeyboardStatus = (
  currentStatus: { [key: string]: LetterStatus },
  guess: string,
  result: { letter: string; status: LetterStatus }[]
): { [key: string]: LetterStatus } => {
  const newStatus = { ...currentStatus }

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i]
    const status = result.find((r) => r.letter === letter)

    if (status) {
      if (newStatus[letter] === 'correct') {
        continue
      } else if (
        newStatus[letter] === 'present' &&
        status.status === 'absent'
      ) {
        continue
      }
      newStatus[letter] = status.status
    } else if (!newStatus[letter]) {
      newStatus[letter] = 'absent'
    }
  }

  console.log('Updated keyboard status:', newStatus)

  return newStatus
}

export const getStatusColor = (status: LetterStatus): string => {
  switch (status) {
    case 'correct':
      return 'bg-green-600'
    case 'present':
      return 'bg-yellow-600'
    case 'absent':
      return 'bg-gray-600'
    default:
      return 'bg-gray-200'
  }
}
