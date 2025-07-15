export interface GameState {
  board: string[][];
  currentRow: number;
  currentCol: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'loading';
  targetWord: string;
  guesses: string[];
  keyboardStatus: { [key: string]: LetterStatus };
  isAnimating: boolean;
  error: string | null;
}

export type LetterStatus = 'correct' | 'present' | 'absent' | 'unused';

export interface CellState {
  letter: string;
  status: LetterStatus;
  isAnimating?: boolean;
}

export interface GameResponse {
  targetWord: string;
  gameId: string;
}

export interface GuessResponse {
  result: LetterStatus[];
  gameStatus: 'playing' | 'won' | 'lost';
  remainingGuesses: number;
}

export interface KeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardStatus: { [key: string]: LetterStatus };
  disabled: boolean;
}

export interface GameModalProps {
  isOpen: boolean;
  gameStatus: 'won' | 'lost';
  targetWord: string;
  onRestart: () => void;
  onClose: () => void;
}