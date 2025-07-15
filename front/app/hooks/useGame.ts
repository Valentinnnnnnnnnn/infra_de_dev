import { useState, useCallback, useEffect } from 'react'
import type { GameState, LetterStatus } from '../types/game'
import { useApi } from './useApi'
import {
  createEmptyBoard,
  isValidWord,
  updateKeyboardStatus,
  WORD_LENGTH,
  MAX_GUESSES,
} from '../utils/gameHelpers'

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentRow: 0,
    currentCol: 0,
    gameStatus: 'loading',
    targetWord: '',
    guesses: [],
    keyboardStatus: {},
    isAnimating: false,
    error: null,
  })

  const [gameId, setGameId] = useState<string>('')
  const { startNewGame, submitGuess, loading, error } = useApi()

  const initializeGame = useCallback(async () => {
    const gameData = await startNewGame()
    if (gameData) {
      setGameId(gameData.gameId)
      setGameState((prev) => ({
        ...prev,
        targetWord: gameData.targetWord,
        gameStatus: 'playing',
        error: null,
      }))
    }
  }, [startNewGame])

  const addLetter = useCallback(
    (letter: string) => {
      if (
        gameState.currentCol >= WORD_LENGTH ||
        gameState.gameStatus !== 'playing'
      )
        return

      setGameState((prev) => {
        const newBoard = prev.board.map((row) => [...row])
        newBoard[prev.currentRow][prev.currentCol] = letter

        return {
          ...prev,
          board: newBoard,
          currentCol: prev.currentCol + 1,
        }
      })
    },
    [gameState.currentCol, gameState.gameStatus]
  )

  const removeLetter = useCallback(() => {
    if (gameState.currentCol <= 0 || gameState.gameStatus !== 'playing') return

    setGameState((prev) => {
      const newBoard = prev.board.map((row) => [...row])
      newBoard[prev.currentRow][prev.currentCol - 1] = ''

      return {
        ...prev,
        board: newBoard,
        currentCol: prev.currentCol - 1,
      }
    })
  }, [gameState.currentCol, gameState.gameStatus])

  const submitCurrentGuess = useCallback(async () => {
    if (
      gameState.currentCol !== WORD_LENGTH ||
      gameState.gameStatus !== 'playing'
    )
      return

    const currentGuess = gameState.board[gameState.currentRow].join('')

    if (!isValidWord(currentGuess)) {
      setGameState((prev) => ({ ...prev, error: 'Mot invalide' }))
      return
    }

    setGameState((prev) => ({ ...prev, isAnimating: true }))

    const result = await submitGuess(gameId, currentGuess)

    if (result) {
      setGameState((prev) => {
        const newKeyboardStatus = updateKeyboardStatus(
          prev.keyboardStatus,
          currentGuess,
          result.result
        )

        return {
          ...prev,
          currentRow: prev.currentRow + 1,
          currentCol: 0,
          gameStatus: result.gameStatus,
          guesses: [...prev.guesses, currentGuess],
          keyboardStatus: newKeyboardStatus,
          isAnimating: false,
          error: null,
        }
      })
    } else {
      setGameState((prev) => ({ ...prev, isAnimating: false }))
    }
  }, [gameState, gameId, submitGuess])

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === 'ENTER') {
        submitCurrentGuess()
      } else if (key === 'BACKSPACE') {
        removeLetter()
      } else if (/^[A-Z]$/.test(key)) {
        addLetter(key)
      }
    },
    [addLetter, removeLetter, submitCurrentGuess]
  )

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentRow: 0,
      currentCol: 0,
      gameStatus: 'loading',
      targetWord: '',
      guesses: [],
      keyboardStatus: {},
      isAnimating: false,
      error: null,
    })
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  useEffect(() => {
    if (error) {
      setGameState((prev) => ({ ...prev, error }))
    }
  }, [error])

  return {
    gameState,
    handleKeyPress,
    resetGame,
    loading,
  }
}
