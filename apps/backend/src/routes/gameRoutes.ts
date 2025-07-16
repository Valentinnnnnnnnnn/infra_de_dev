import { Router } from 'express'
import { newGame, getGame } from '../controllers/gameController'
import { validate } from '../utils/validate'

const router = Router()

router.post('/new', newGame)
router.get('/:id', getGame)

export default router
