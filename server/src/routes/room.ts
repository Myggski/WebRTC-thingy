
import { Router } from 'express';
import { Success, Created, NoContent } from '../core/apiSuccess';
import RoomRepo from '../database/repository/RoomRepo';

const router = Router();

/**
 * Get all rooms
 */
router.get('/', (req: any, res: any, next: any) => {
    const rooms = RoomRepo.getRooms();
    return Success(rooms).send(res);
});

/**
 * Get room by name
 */
router.get('/:name', (req: any, res: any, next: any) => {
    const room = RoomRepo.findRoomByName(req.params.name);
    return Success(room).send(res);
});

/**
 * Remove room by name
 */
router.delete('/:name', (req: any, res: any, next: any) => {
    const { name } = req.params;

    RoomRepo.removeRoomByName(name);
    return NoContent(`Room ${name} is deleted`).send(res);
});

/**
 * Create room
 */
router.post('/', (req: any, res: any) => {
    const room = RoomRepo.create(req.body?.name, req.body?.type);
    console.log(req.body);
    return Created(room).send(res);
});

export default router;