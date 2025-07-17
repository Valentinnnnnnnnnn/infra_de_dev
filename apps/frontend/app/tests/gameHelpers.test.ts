import {
  MAX_GUESSES,
  KEYBOARD_LAYOUT,
  isValidWord,
  createEmptyBoard,
  updateKeyboardStatus,
  getStatusColor,
} from '../utils/gameHelpers'

describe('gameHelpers', () => {
  describe('isValidWord', () => {
    it('returns true for valid words with correct length', () => {
      expect(isValidWord('HELLO', 5)).toBe(true)
      expect(isValidWord('WORLD', 5)).toBe(true)
    })

    it('returns false for words with incorrect length', () => {
      expect(isValidWord('HELLO', 4)).toBe(false)
      expect(isValidWord('HI', 5)).toBe(false)
    })

    it('returns false for words with non uppercase letters', () => {
      expect(isValidWord('hello', 5)).toBe(false)
      expect(isValidWord('Hello', 5)).toBe(false)
      expect(isValidWord('HELLo', 5)).toBe(false)
    })
  })

  describe('createEmptyBoard', () => {
    it('creates a board with MAX_GUESSES rows', () => {
      const length = 5
      const board = createEmptyBoard(length)
      expect(board.length).toBe(MAX_GUESSES)
      board.forEach((row) => {
        expect(row.length).toBe(length)
        row.forEach((cell) => {
          expect(cell).toBe('')
        })
      })
    })
  })

  describe('updateKeyboardStatus', () => {
    type LetterStatus = 'correct' | 'present' | 'absent'

    it('updates keyboard status based on guess and result', () => {
      const initialStatus: { [key: string]: LetterStatus } = {}
      const guess = 'HELLO'
      const result: { letter: string; status: LetterStatus }[] = [
        { letter: 'H', status: 'present' },
        { letter: 'E', status: 'absent' },
        { letter: 'L', status: 'correct' },
        { letter: 'L', status: 'present' },
        { letter: 'O', status: 'present' },
      ]

      const updated = updateKeyboardStatus(initialStatus, guess, result)
      expect(updated['H']).toBe('present')
      expect(updated['E']).toBe('absent')
      expect(updated['L']).toBe('correct')
      expect(updated['O']).toBe('present')
      expect(Object.keys(updated).length).toBe(4)
    })

    it('does not downgrade a letter status from correct', () => {
      const initialStatus: { [key: string]: LetterStatus } = { A: 'correct' }
      const guess = 'A'
      const result: { letter: string; status: LetterStatus }[] = [
        { letter: 'A', status: 'correct' },
      ]
      const updated = updateKeyboardStatus(initialStatus, guess, result)
      expect(updated['A']).toBe('correct')
    })

    it('does not downgrade a letter status from present to absent', () => {
      const initialStatus: { [key: string]: LetterStatus } = { B: 'present' }
      const guess = 'B'
      const result: { letter: string; status: LetterStatus }[] = [
        { letter: 'B', status: 'absent' },
      ]
      const updated = updateKeyboardStatus(initialStatus, guess, result)
      expect(updated['B']).toBe('present')
    })

    it('updates a letter when no previous status exists', () => {
      const initialStatus: { [key: string]: LetterStatus } = {}
      const guess = 'C'
      const result: { letter: string; status: LetterStatus }[] = [
        { letter: 'C', status: 'absent' },
      ]
      const updated = updateKeyboardStatus(initialStatus, guess, result)
      expect(updated['C']).toBe('absent')
    })
  })

  describe('getStatusColor', () => {
    it('returns green for correct status', () => {
      expect(getStatusColor('correct')).toBe('bg-green-600')
    })

    it('returns yellow for present status', () => {
      expect(getStatusColor('present')).toBe('bg-yellow-600')
    })

    it('returns gray for absent status', () => {
      expect(getStatusColor('absent')).toBe('bg-gray-600')
    })

    it('returns default gray for any other status', () => {
      expect(getStatusColor('' as any)).toBe('bg-gray-200')
      expect(getStatusColor(null as any)).toBe('bg-gray-200')
    })
  })

  describe('Constants', () => {
    it('defines MAX_GUESSES as 6', () => {
      expect(MAX_GUESSES).toBe(6)
    })

    it('defines KEYBOARD_LAYOUT with three rows', () => {
      expect(KEYBOARD_LAYOUT.length).toBe(3)
      expect(KEYBOARD_LAYOUT[0]).toEqual([
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
      ])
    })
  })
})
