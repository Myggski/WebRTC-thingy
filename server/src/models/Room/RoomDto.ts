import { v4 as uuid } from 'uuid';
import RoomType from './RoomType';

class RoomDto {
  private _id: string;
  private _name: string;
  private _type: RoomType;

  constructor(name: string, type: RoomType) {
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

  get type(): RoomType {
    return this._type;
  }
}

export default RoomDto;
