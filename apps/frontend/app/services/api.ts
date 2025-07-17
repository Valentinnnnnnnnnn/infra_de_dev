import type { GameResponse, GuessResponse } from '../types/game'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || '/api/v1') {
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
}

export const apiService = new ApiService()
