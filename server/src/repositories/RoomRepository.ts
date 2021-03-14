import { InternalError, NotFoundError } from '../core/apiError';
import RoomDto from '../models/Room/RoomDto';
import Repository from './Repository';

// TODO: Add real database, but which one?
export default class RoomRepository implements Repository<RoomDto> {
  private _rooms: Array<RoomDto> = [];

  /**
   * Creating a voice-room or a text-room
   * @param name - Name of the room
   * @param type - Type of room, voice or text
   */
  public create(room: RoomDto): RoomDto {
    const foundRoom = this._rooms.find(r => r.name === room.name && r.type === room.type);
    if (foundRoom) throw new InternalError('Room already exist');

    this._rooms.push(room);

    return room;
  }

  /**
   * Trying to find room by room id
   * @param id - The id of the room
   */
  public findById(id: string): RoomDto {
    const foundRoom = this._rooms.find(r => r.id === id);
    if (!foundRoom) throw new NotFoundError('Room does not exist');

    return foundRoom;
  }

  /**
   * Finding a room, and removes it
   * @param id - Room id
   */
  public delete(id: string): void {
    const index = this._rooms.findIndex(room => room.id === id);

    if (index !== -1) {
      this._rooms.splice(index, 1);
    }
  }

  /**
   * Get all the rooms in array
   * Using Object.freeze for performance, and having a chance to use Readonly<T>
   */
  public getList(): readonly RoomDto[] {
    const clonedRooms = this._rooms.slice(0);

    return Object.freeze(clonedRooms);
  }
};
