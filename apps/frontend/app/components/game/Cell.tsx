import type { CellState } from '../../types/game'
import { getStatusColor } from '../../utils/gameHelpers'

interface CellProps {
  cell: CellState
  isCurrentRow: boolean
  columnIndex: number
  animationDelay?: number
}

export const Cell = ({
  cell,
  isCurrentRow,
  columnIndex,
  animationDelay = 0,
}: CellProps) => {
  const baseClasses =
    'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300'
  const statusColor = getStatusColor(cell.status)

  const borderColor =
    isCurrentRow && cell.letter ? 'border-gray-500' : 'border-gray-300'

  return (
    <div
      className={`${baseClasses} ${statusColor} ${borderColor} ${
        cell.isAnimating ? 'animate-bounce' : ''
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {cell.letter}
    </div>
  )
}
