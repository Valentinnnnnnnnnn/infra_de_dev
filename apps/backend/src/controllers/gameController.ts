import { Request, Response } from 'express';
import * as service from '../services/gameService';

export async function newGame(req: Request, res: Response) {
  const game = await service.startNewGame();
  res.status(201).json({ gameId: game.id, target: game.target });
}