import type { LetterStatus } from '../types/game'

export const WORD_LENGTH = 5
export const MAX_GUESSES = 6

export const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
]

export const isValidWord = (word: string): boolean => {
  return word.length === WORD_LENGTH && /^[A-Z]+$/.test(word)
}

export const createEmptyBoard = (): string[][] => {
  return Array(MAX_GUESSES)
    .fill(null)
    .map(() => Array(WORD_LENGTH).fill(''))
}

export const updateKeyboardStatus = (
  currentStatus: { [key: string]: LetterStatus },
  guess: string,
  result: LetterStatus[]
): { [key: string]: LetterStatus } => {
  const newStatus = { ...currentStatus }

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i]
    const status = result[i]

    // Priorité: correct > present > absent
    if (newStatus[letter] === 'correct') continue
    if (newStatus[letter] === 'present' && status === 'absent') continue

    newStatus[letter] = status
  }

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
