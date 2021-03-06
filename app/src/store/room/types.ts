export enum ROOM_TYPE {
  VOICE,
  TEXT,
}

export interface Room {
  id: string;
  name: string;
  type: ROOM_TYPE;
}

export interface RoomState {
  rooms: Array<Room>;
}
