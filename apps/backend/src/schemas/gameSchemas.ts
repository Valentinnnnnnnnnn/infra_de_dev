import { z } from 'zod'

export const NewGameSchema = z.object({
  // Rien pour le moement, à compléter si plusieurs modes de jeu
})

export const GuessSchema = z.object({
  guess: z.string().min(1).max(100),
})
export type GuessInput = z.infer<typeof GuessSchema>