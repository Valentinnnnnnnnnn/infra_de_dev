import { query } from 'winston'
import { z } from 'zod'

export const NewGameSchema = z.object({
  // Rien pour le moement, à compléter si plusieurs modes de jeu
})

export const GameIdSchema = z.object({
  query: z.object({
    gameId: z.string().uuid(),
  }),
})
export type GameIdInput = z.infer<typeof GameIdSchema>

export const GuessSchema = z.object({
  query: z.object({
    gameId: z.string().uuid(),
    guess: z.string().min(1, 'Guess cannot be empty'),
  }),
})
export type GuessInput = z.infer<typeof GuessSchema>
