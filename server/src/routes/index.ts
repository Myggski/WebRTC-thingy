import { Router } from 'express';
import room from './room';

const router = Router();

/*-------------------------------*/
// Routes
/*-------------------------------*/
router.use('/room', room);

export default router;