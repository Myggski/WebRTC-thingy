import User from './User';
import StatusType from './StatusType';

class RoomBuilder {
  private _id: string;
  private _name: string;
  private _status: StatusType;

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get status(): StatusType {
    return this._status;
  }

  public setId(id: string): RoomBuilder {
    this._id = id;
    return this;
  }

  public setName(name: string): RoomBuilder {
    this._name = name;
    return this;
  }

  public setType(type: StatusType): RoomBuilder {
    this._status = type;
    return this;
  }

  public build(): User {
    return new User(this);
  }
}

export default RoomBuilder;