import { Guess } from '@prisma/client'

export interface GuessRepo {
  createGuess(gameId: string, guess: string, result: {}): Promise<Guess>
  getGuessById(id: number): Promise<Guess | null>
  getAllGuessesByGameId(gameId: string): Promise<Guess[]>
  updateGuess(id: number, data: Partial<Guess>): Promise<Guess>
  deleteGuess(id: number): Promise<void>
}
