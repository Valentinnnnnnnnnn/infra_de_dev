import type { GameModalProps } from '../../types/game'
import { Button } from '../ui/Button'
import { useEffect, useState } from 'react'

export const GameModal = ({
  isOpen,
  gameStatus,
  onRestart,
  resolvedWord,
}: GameModalProps) => {
  const [word, setWord] = useState<string | null>(null)

  useEffect(() => {
    if (gameStatus !== 'won') {
      const fetchWord = async () => {
        const resolved = await resolvedWord()
        setWord(resolved || '')
      }
      fetchWord()
    } else {
      setWord(null)
    }
  }, [gameStatus])

  if (!isOpen) return null

  const isWon = gameStatus === 'won'
  const title = isWon ? 'Félicitations !' : 'Dommage !'
  const message = isWon
    ? 'Vous avez trouvé le mot !'
    : `Le mot était : ${word || '...'}`

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <div className="text-center">
          <h2
            className={`text-2xl font-bold mb-4 ${
              isWon ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {title}
          </h2>
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={onRestart} variant="primary">
              Nouvelle Partie
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
