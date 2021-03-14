export enum RoomType {
  VOICE,
  TEXT,
}

export interface Room {
  _id: string;
  _name: string;
  _type: RoomType;
}

export class Room implements Room {
  constructor(name: string, type: RoomType) {
    this._name = name;
    this._type = type;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }
}
