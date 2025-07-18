import type { LoaderFunction } from 'react-router'
import { useGame } from '../hooks/useGame'
import { useKeyboard } from '../hooks/useKeyboard'
import { Board } from '../components/game/Board'
import { Keyboard } from '../components/game/Keyboard'
import { GameModal } from '../components/game/GameModal'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Button } from '../components/ui/Button'
import { useState, useEffect } from 'react'
export const loader: LoaderFunction = async () => {
  return { message: 'Jeu chargé' }
}

export default function GameRoute() {
  const { gameState, handleKeyPress, resetGame, loading, getResolved } =
    useGame()
  const [word, setWord] = useState<string | null>(null)

  useEffect(() => {
    if (gameState.gameStatus === 'lost') {
      getResolved()
        .then((res) => setWord(res || ''))
        .catch(() => setWord(''))
    }
  }, [gameState.gameStatus])

  useKeyboard(
    handleKeyPress,
    gameState.gameStatus !== 'playing' || gameState.isAnimating
  )

  const showModal =
    gameState.gameStatus === 'won' || gameState.gameStatus === 'lost'

  if (loading || gameState.gameStatus === 'loading') {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find The Word
          </h1>
          <p className="text-gray-600">Trouvez le mot en 6 essais maximum</p>
          <div className="mt-4">
            <Button onClick={resetGame} variant="secondary" size="sm">
              Nouvelle Partie
            </Button>
          </div>
        </header>

        {gameState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {gameState.error}
          </div>
        )}

        <main className="bg-white rounded-lg shadow-lg p-6">
          <Board gameState={gameState} />
          <Keyboard
            onKeyPress={handleKeyPress}
            keyboardStatus={gameState.keyboardStatus}
            disabled={
              gameState.gameStatus !== 'playing' || gameState.isAnimating
            }
          />
        </main>

        <GameModal
          isOpen={showModal}
          gameStatus={gameState.gameStatus as 'won' | 'lost'}
          onRestart={resetGame}
          resolvedWord={word}
        />
      </div>
    </div>
  )
}
