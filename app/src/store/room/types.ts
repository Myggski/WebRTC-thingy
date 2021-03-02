enum ROOM_TYPES {
  VOICE,
  TEXT,
}

export interface Room {
  name: string;
  type: ROOM_TYPES;
}

export interface RoomState {
  rooms: Array<Room>;
}
