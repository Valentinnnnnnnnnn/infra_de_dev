import { Row } from './Row'
import type { GameState } from '../../types/game'

interface BoardProps {
  gameState: GameState
}

export const Board = ({ gameState }: BoardProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      {gameState.board.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          row={row}
          isCurrentRow={rowIndex === gameState.currentRow}
          guessResult={
            rowIndex < gameState.guesses.length
              ? gameState.guesses[rowIndex].split('')
              : undefined
          }
          isAnimating={
            gameState.isAnimating && rowIndex === gameState.currentRow
          }
        />
      ))}
    </div>
  )
}
