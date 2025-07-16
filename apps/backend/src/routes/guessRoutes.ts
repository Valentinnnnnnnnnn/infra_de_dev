import { Router } from 'express'
import { validate } from '../utils/validate'
import { newGuess, getGuesses } from '../controllers/guessController'
import { GameIdSchema, GuessSchema } from '../schemas/gameSchemas'

const router = Router()

router.post('/', validate(GuessSchema), newGuess)
router.get('/', validate(GameIdSchema), getGuesses)

export default router
