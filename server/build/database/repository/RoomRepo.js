"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = require("./../../core/apiError");
class RoomRepo {
    /**
     * Creating a voice-room or a text-room
     * @param room
     */
    static create(room) {
        const foundRoom = this.rooms.find(r => r.name === room.name);
        if (foundRoom)
            throw new apiError_1.InternalError('Room already exist');
        this.rooms.push(room);
        console.log(room);
        return room;
    }
    /**
     * Find a room by the name of the room
     * @param name - Room name, which is unique, in this example
     */
    static findRoomByName(name) {
        return this.rooms.find(room => room.name === name);
    }
    /**
     * Finding a room, and removes it, maybe throw error if the room is not found?!
     * @param name - Room name, which is unique, in this example
     */
    static removeRoomByName(name) {
        const index = this.rooms.findIndex(room => room.name === name);
        if (index !== -1) {
            this.rooms.splice(index, 1);
        }
    }
    /**
     * Get all the rooms in array
     * Using Object.freeze for performance, and having a chance to use Readonly<T>
     */
    static getRooms() {
        return Object.freeze(this.rooms);
    }
}
exports.default = RoomRepo;
RoomRepo.rooms = [];
;
//# sourceMappingURL=RoomRepo.js.map