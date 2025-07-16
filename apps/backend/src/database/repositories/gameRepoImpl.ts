import { getDatabase } from '../index'
import { GameRepo } from '../interfaces/gameRepo'
import { Game } from '@prisma/client'

export class GameRepoImpl implements GameRepo {
  private prisma = getDatabase()

  async createGame(target: string): Promise<Game> {
    return this.prisma.game.create({ data: { target } })
  }

  async getGameById(id: string): Promise<Game | null> {
    return this.prisma.game.findUnique({ where: { id } })
  }

  async getAllGames(): Promise<Game[]> {
    return this.prisma.game.findMany()
  }

  async updateGame(id: string, data: Partial<Game>): Promise<Game> {
    return this.prisma.game.update({ where: { id }, data })
  }

  async deleteGame(id: string): Promise<void> {
    await this.prisma.game.delete({ where: { id } })
  }
}
