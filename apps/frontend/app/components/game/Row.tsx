import { Cell } from './Cell'
import type { CellState } from '../../types/game'
import type { LetterStatus } from '../../types/game'

interface RowProps {
  row: string[]
  isCurrentRow: boolean
  guessResult: LetterStatus[]
  isAnimating?: boolean
}

export const Row = ({
  row,
  isCurrentRow,
  guessResult,
  isAnimating = false,
}: RowProps) => {
  const cells: CellState[] = row.map((letter, index) => ({
    letter,
    status: guessResult ? guessResult[index] : 'unused',
    isAnimating: isAnimating && !!letter,
  }))

  return (
    <div className="flex gap-2 mb-2">
      {cells.map((cell, index) => (
        <Cell
          key={index}
          cell={cell}
          isCurrentRow={isCurrentRow}
          columnIndex={index}
          animationDelay={index * 100}
        />
      ))}
    </div>
  )
}
