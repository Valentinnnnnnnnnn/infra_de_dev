import { getDatabase } from '../index'
import { GuessRepo } from '../interfaces/guessRepo'
import { Guess } from '@prisma/client'

export class GuessRepoImpl implements GuessRepo {
  private prisma = getDatabase()

  async createGuess(gameId: string, guess: string, result: {}): Promise<Guess> {
    return this.prisma.guess.create({ data: { gameId, guess, result } })
  }

  async getGuessById(id: number): Promise<Guess | null> {
    return this.prisma.guess.findUnique({ where: { id } })
  }

  async getAllGuessesByGameId(gameId: string): Promise<Guess[]> {
    return this.prisma.guess.findMany({ where: { gameId } })
  }

  async updateGuess(
    id: number,
    data: Partial<Omit<Guess, 'id' | 'gameId'>>
  ): Promise<Guess> {
    const updateData = {
      ...data,
      result: data.result === null ? undefined : data.result,
    }
    return this.prisma.guess.update({ where: { id }, data: updateData })
  }

  async deleteGuess(id: number): Promise<void> {
    await this.prisma.guess.delete({ where: { id } })
  }
}
