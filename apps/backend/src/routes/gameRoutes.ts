import { Router } from 'express'
import {
  newGame,
  getGame,
  getResolvedWord,
} from '../controllers/gameController'

const router = Router()

router.post('/new', newGame)
router.get('/:id', getGame)
router.get('/:id/resolved', getResolvedWord)

export default router
