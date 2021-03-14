import Room from './Room';
import RoomType from './RoomType';

class RoomBuilder {
  private _id: string;
  private _name: string;
  private _type: RoomType;

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): RoomType {
    return this._type;
  }

  public setId(id: string): RoomBuilder {
    this._id = id;
    return this;
  }

  public setName(name: string): RoomBuilder {
    this._name = name;
    return this;
  }

  public setType(type: RoomType): RoomBuilder {
    this._type = type;
    return this;
  }

  public build(): Room {
    return new Room(this);
  }
}

export default RoomBuilder;