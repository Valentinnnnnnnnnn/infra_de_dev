import { useState, useCallback } from 'react'
import { apiService } from '../services/api'
import type { GameResponse, GuessResponse } from '../types/game'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startNewGame = useCallback(async (): Promise<GameResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiService.startNewGame()
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const submitGuess = useCallback(
    async (gameId: string, guess: string): Promise<GuessResponse | null> => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiService.submitGuess(gameId, guess)
        return response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getResolvedWord = useCallback(
    async (gameId: string): Promise<string | null> => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiService.getResolvedWord(gameId)
        return response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { startNewGame, submitGuess, getResolvedWord, loading, error }
}
