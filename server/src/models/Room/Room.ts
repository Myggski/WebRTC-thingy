import RoomType from './RoomType';
import RoomBuilder from './RoomBuilder';

/**
 * Information about a room
 * name - Name of the room
 * type - what type of room
 */
class Room {
    private _id: string;
    private _name: string;
    private _type: RoomType;

    constructor(builder: RoomBuilder) {
        this._id = builder.id;
        this._name = builder.name;
        this._type = builder.type;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get type(): RoomType {
        return this._type;
    }
}

export default Room;
