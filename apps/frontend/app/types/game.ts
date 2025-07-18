export interface GameState {
  board: string[][]
  currentRow: number
  currentCol: number
  gameStatus: 'playing' | 'won' | 'lost' | 'loading'
  length: number
  guesses: string[]
  guessResults: LetterStatus[][]
  keyboardStatus: { [key: string]: LetterStatus }
  isAnimating: boolean
  error: string | null
}

export type LetterStatus = 'correct' | 'present' | 'absent' | 'unused'

export interface CellState {
  letter: string
  status: LetterStatus
  isAnimating?: boolean
}

export interface GameResponse {
  length: number
  gameId: string
}

export interface GuessResponse {
  result: LetterStatus[]
  gameStatus: 'playing' | 'won' | 'lost'
  remainingGuesses: number
}

export interface KeyboardProps {
  onKeyPress: (key: string) => void
  keyboardStatus: { [key: string]: LetterStatus }
  disabled: boolean
}

export interface GameModalProps {
  isOpen: boolean
  gameStatus: 'won' | 'lost'
  resolvedWord: string | null
  onRestart: () => void
}
