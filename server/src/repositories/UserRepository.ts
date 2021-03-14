import { InternalError, NotFoundError } from '../core/apiError';
import UserDto from '../models/User/UserDto';
import StatusType from '../models/User/StatusType';
import Repository from './Repository';

// TODO: Add real database, but which one?
class UserRepository implements Repository<UserDto> {
  private _users: Array<UserDto> = [];

  /**
   * Creating a voice-user or a text-user
   * @param name - Name of the user
   * @param type - Type of user, voice or text
   */
  public create(user: UserDto): UserDto {
    const foundUser = this._users.find(r => r.name === user.name && r.status === user.status);
    if (foundUser) throw new InternalError('User already exist');

    this._users.push(user);

    return user;
  }

  /**
   * Trying to find user by user id
   * @param id - The id of the user
   */
  public findById(id: string): UserDto {
    const foundUser = this._users.find(r => r.id === id);
    if (!foundUser) throw new NotFoundError('User does not exist');

    return foundUser;
  }

  /**
   * Finding a user, and removes it
   * @param id - User id
   */
  public delete(id: string): void {
    const index = this._users.findIndex(user => user.id === id);

    if (index !== -1) {
      this._users.splice(index, 1);
    }
  }

  /**
   * Get all the users in array
   * Using Object.freeze for performance, and having a chance to use Readonly<T>
   */
  public getList(): readonly UserDto[] {
    const clonedUsers = this._users.slice(0);

    return Object.freeze(clonedUsers);
  }

  public updateStatus(id: string, status: StatusType): UserDto {
    const userDto = this.findById(id);
    userDto.changeStatus(status);

    return userDto;
  }
};

export default UserRepository;