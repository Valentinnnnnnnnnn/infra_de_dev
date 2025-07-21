import { useCallback } from 'react'
import type { LetterStatus } from '../types/game'
import { useStatusSounds } from './useStatusSounds'
import { flushSync } from 'react-dom'

export const useSequentialReveal = (
  setGameState: React.Dispatch<React.SetStateAction<any>>
) => {
  const { playStatusSound } = useStatusSounds()

  const revealResultSequentially = useCallback(
    async (result: LetterStatus[], row: number, delay: number = 300) => {
      for (let col = 0; col < result.length; col++) {
        const status = result[col]

        flushSync(() => {
          setGameState((prev: any) => {
            const newGuessResults = prev.guessResults.map((r:any, i:any) =>
              i === row ? r.map((s:number, j:number) => (j === col ? status : s)) : r
            )
            return { ...prev, guessResults: newGuessResults }
          })
        })

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
