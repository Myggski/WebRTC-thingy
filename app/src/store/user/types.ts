export enum StatusType {
  Online,
  Busy,
  Offline,
}

export class User {
  private _id: string;
  private _name: string;
  private _status: StatusType;

  constructor(name: string) {
    this._name = name;
    this._status = StatusType.Offline;
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
