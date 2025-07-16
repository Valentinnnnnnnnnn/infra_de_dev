import { Router } from 'express';
import * as ctrl from '../controllers/gameController';

const router = Router();
router.post('/new', ctrl.newGame);

export default router;