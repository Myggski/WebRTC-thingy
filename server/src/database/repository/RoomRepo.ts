import { Created } from './../../core/apiSuccess';
import { InternalError, ApiError, ErrorType, NotFoundError } from './../../core/apiError';
import Room from '../model/Room';

// TODO: Add real database, but which one?
export default class RoomRepo {
    private static rooms: Array<Room> = [];

    /**
     * Creating a voice-room or a text-room
     * @param room
     */
    public static create(room: Room): Room {
        const foundRoom = this.rooms.find(r => r.name === room.name);
        if (foundRoom) throw new InternalError('Room already exist');

        this.rooms.push(room);

        return room;
    }

    /**
     * Find a room by the name of the room
     * @param name - Room name, which is unique, in this example
     */
    public static findRoomByName(name: string): Room {
        const foundRoom = this.rooms.find(r => r.name === name);
        if (!foundRoom) throw new NotFoundError('Room does not exist');

        return foundRoom;
    }

    /**
     * Finding a room, and removes it, maybe throw error if the room is not found?!
     * @param name - Room name, which is unique, in this example
     */
    public static removeRoomByName(name: string): void {
        const index = this.rooms.findIndex(room => room.name === name);

        if (index !== -1) {
            this.rooms.splice(index, 1);
        }
    }

    /**
     * Get all the rooms in array
     * Using Object.freeze for performance, and having a chance to use Readonly<T>
     */
    public static getRooms(): Readonly<Array<Room>> {
        return Object.freeze(this.rooms);
    }
};
