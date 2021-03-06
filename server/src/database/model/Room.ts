/**
 * Voice-chat or text-chat
 */
export enum ROOM_TYPE {
    VOICE,
    TEXT
};

/**
 * Information about a room
 * name - Name of the room (unique)
 * type - what type of room
 */
export interface Room {
    id: string,
    name: string,
    type: ROOM_TYPE,
};