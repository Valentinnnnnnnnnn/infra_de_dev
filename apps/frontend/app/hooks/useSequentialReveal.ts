import { useCallback } from 'react'
import type { LetterStatus } from '../types/game'
import { useStatusSounds } from './useStatusSounds'

export const useSequentialReveal = (
  setGameState: React.Dispatch<React.SetStateAction<any>>
) => {
  const { playStatusSound } = useStatusSounds()

  const revealResultSequentially = useCallback(
    async (result: LetterStatus[], row: number, delay: number = 300) => {
      for (let col = 0; col < result.length; col++) {
        const status = result[col]
        const tileKey = `${row}-${col}`

        setGameState((prev: any) => ({
          ...prev,
          tileStates: { ...prev.tileStates, [tileKey]: status },
        }))

        playStatusSound(status)

        if (col < result.length - 1) {
          await new Promise((res) => setTimeout(res, delay))
        }
      }
    },
    [playStatusSound, setGameState]
  )

  return { revealResultSequentially }
}
