import { Router } from 'express';
import room from './room';
import user from './user';

const router = Router();

/*-------------------------------*/
// Routes
/*-------------------------------*/
router.use('/room', room);
router.use('/user', user);

export default router;