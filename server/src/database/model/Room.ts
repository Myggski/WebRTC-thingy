/**
 * Voice-chat or text-chat
 */
export enum ROOM_TYPES {
    VOICE,
    TEXT
};

/**
 * Information about a room
 * name - Name of the room (unique)
 * type - what type of room
 */
export default interface Room {
    name: string,
    type: ROOM_TYPES,
};