import { Game } from '@prisma/client'

export interface GameRepo {
  createGame(target: string): Promise<Game>
  getGameById(id: string): Promise<Game | null>
  getAllGames(): Promise<Game[]>
  updateGame(id: string, data: Partial<Game>): Promise<Game>
  deleteGame(id: string): Promise<void>
}
