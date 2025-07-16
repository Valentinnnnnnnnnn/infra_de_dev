import { Key } from './Key'
import type { KeyboardProps } from '../../types/game'
import { KEYBOARD_LAYOUT } from '../../utils/gameHelpers'

export const Keyboard = ({
  onKeyPress,
  keyboardStatus,
  disabled,
}: KeyboardProps) => {
  return (
    <div className="mt-8 space-y-2">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <Key
              key={key}
              keyValue={key}
              status={keyboardStatus[key] || 'unused'}
              onClick={onKeyPress}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
