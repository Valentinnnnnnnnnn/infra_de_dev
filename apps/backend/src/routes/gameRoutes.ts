import { Router } from 'express'
import { newGame } from '../controllers/gameController'

const router = Router()
router.post('/new', newGame)

export default router
