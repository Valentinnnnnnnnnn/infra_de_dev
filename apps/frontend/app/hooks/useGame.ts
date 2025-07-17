import { useState, useCallback, useEffect } from 'react'
import type { GameState, LetterStatus } from '../types/game'
import { useApi } from './useApi'
import {
  createEmptyBoard,
  isValidWord,
  updateKeyboardStatus,
  MAX_GUESSES,
} from '../utils/gameHelpers'

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentRow: 0,
    currentCol: 0,
    gameStatus: 'loading',
    length: 5,
    board: createEmptyBoard(5),
    guesses: [],
    guessResults: [],
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
        length: gameData.length, // Mise à jour de la longueur
        board: createEmptyBoard(gameData.length), // Recréation du plateau
        targetWordLength: gameData.length,
        gameStatus: 'playing',
        error: null,
      }))
    }
  }, [startNewGame])

  const addLetter = useCallback(
    (letter: string) => {
      if (
        gameState.currentCol >= gameState.length ||
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
      gameState.currentCol !== gameState.length ||
      gameState.gameStatus !== 'playing'
    )
      return

    const currentGuess = gameState.board[gameState.currentRow].join('')

    if (!isValidWord(currentGuess, gameState.length)) {
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
          result.result.map((status, index) => ({
            letter: currentGuess[index],
            status,
          }))
        )

        const allCorrect = result.result.every(
          (status: LetterStatus) => status === 'correct'
        )

        const gameStatus = allCorrect
          ? 'won'
          : prev.currentRow + 1 >= MAX_GUESSES
            ? 'lost'
            : 'playing'

        return {
          ...prev,
          currentRow: prev.currentRow + 1,
          currentCol: 0,
          gameStatus: gameStatus,
          guesses: [...prev.guesses, currentGuess],
          guessResults: [...prev.guessResults, result.result],
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
    setGameState((prev) => ({
      currentRow: 0,
      currentCol: 0,
      gameStatus: 'loading',
      length: prev.length,
      board: createEmptyBoard(prev.length),
      guesses: [],
      guessResults: [],
      keyboardStatus: {},
      isAnimating: false,
      error: null,
    }))
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
