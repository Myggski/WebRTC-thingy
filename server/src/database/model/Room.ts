import { Required } from '../../core/decorators/propertyDecorators';
import { v4 as uuid } from 'uuid';
/**
 * Voice-chat or text-chat
 */
export enum ROOM_TYPE {
    VOICE,
    TEXT,
};

/**
 * Information about a room
 * name - Name of the room
 * type - what type of room
 */
export class Room {
    @Required('Id')
    private _id: string;

    @Required('Name')
    private _name: string;

    @Required('Type')
    private _type: ROOM_TYPE;

    constructor(name: string, type: ROOM_TYPE) {
        this._id = uuid();
        this._name = name;
        this._type = type;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get type(): ROOM_TYPE {
        return this._type;
    }
}