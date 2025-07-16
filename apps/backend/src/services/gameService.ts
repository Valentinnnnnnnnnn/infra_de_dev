import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function startNewGame() {
  const target = chooseRandomTarget();
  const game = await prisma.game.create({ data: { target } });
  return game;
}
