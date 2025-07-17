import type { GameResponse, GuessResponse } from '../types/game'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || 'http://31.97.197.115:3009/api/v1') {
    this.baseUrl = baseUrl
  }

  async startNewGame(): Promise<GameResponse> {
    const response = await fetch(`${this.baseUrl}/game/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la création du jeu')
    }

    return response.json()
  }

  async submitGuess(gameId: string, guess: string): Promise<GuessResponse> {
    const response = await fetch(
      `${this.baseUrl}/guess/?gameId=${gameId}&guess=${guess}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la soumission de la proposition')
    }

    return response.json()
  }

  async getGameState(gameId: string): Promise<GameResponse> {
    const response = await fetch(`${this.baseUrl}/game/${gameId}`)

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du jeu')
    }

    return response.json()
  }

  async getResolvedWord(gameId: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/game/${gameId}/resolved`)

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du mot résolu')
    }

    const data = await response.json()
    return data.resolvedWord || ''
  }
}

export const apiService = new ApiService()
