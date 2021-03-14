
import { Router } from 'express';
import { Success, Created, NoContent } from '../core/apiSuccess';
import RoomService from '../services/RoomService';

const router = Router();
const roomService = new RoomService();

/**
 * Get all rooms
 */
router.get('/', (req: any, res: any, next: any) => {
  return Success(roomService.getList()).send(res);
});

/**
 * Get room by name
 */
router.get('/:name', (req: any, res: any, next: any) => {
  return Success(roomService.findById(req.params.id)).send(res);
});

/**
 * Remove room by name
 */
router.delete('/:name', (req: any, res: any, next: any) => {
  const { id } = req.params;
  roomService.delete(id);
  return NoContent(`Room ${id} is deleted`).send(res);
});

/**
 * Create room
 */
router.post('/', (req: any, res: any) => {
  const room = roomService.create(req.body);
  return Created(room).send(res);
});

export default router;