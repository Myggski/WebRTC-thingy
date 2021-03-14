import { Router } from 'express';
import { Success, Created, NoContent } from '../core/apiSuccess';
import UserService from '../services/UserService';

const router = Router();
const service = new UserService();

/**
 * Get all users
 */
router.get('/', (req: any, res: any, next: any) => {
  const rooms = service.getList();
  return Success(rooms).send(res);
});

/**
 * Get user by id
 */
router.get('/:id', (req: any, res: any, next: any) => {
  const room = service.findById(req.params.id);
  return Success(room).send(res);
});

/**
 * Remove user by id
 */
router.delete('/:id', (req: any, res: any, next: any) => {
  const { id } = req.params;

  service.delete(id);
  return NoContent(`User is deleted`).send(res);
});

/**
 * Create user
 */
router.post('/', (req: any, res: any) => {
  const room = service.create(req.body?.name);
  return Created(room).send(res);
});

router.put('/:id/status', (req: any, res: any) => {
  const room = service.updateStatus(req.params?.id, req.body?.status);
  return Success(room).send(res);
});

export default router;