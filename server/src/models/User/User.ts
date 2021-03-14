import StatusType from './StatusType';
import UserBuilder from './UserBuilder';

class User {
  private _id: string;
  private _name: string;
  private _status: StatusType;

  constructor(builder: UserBuilder) {
    this._id = builder.id;
    this._name = builder.name;
    this._status = builder.status;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get status(): StatusType {
    return this._status;
  }

  public changeStatus(status: StatusType) {
    this._status = status;
  }
}

export default User;
