import Service from './Service';
import User from '../models/User/User';
import UserBuilder from '../models/User/UserBuilder';
import UserDto from '../models/User/UserDto';
import StatusType from '../models/User/StatusType';
import UserRepository from '../repositories/UserRepository';

// TODO: Validate values better, and handle error better
class UserService implements Service<User> {
  private readonly _repository: UserRepository;

  constructor() {
    this._repository = new UserRepository();
  }

  getList(): User[] {
    return this._repository.getList().map(this.convertToUser);
  }

  findById(id: string): User {
    return this.convertToUser(this._repository.findById(id));
  }

  create(entity: User): User {
    return this.convertToUser(this._repository.create(this.convertToUserDto(entity)));
  }

  delete(id: string): void {
    this._repository.delete(id);
  }

  updateStatus(id: string, status: StatusType): User {
    return this.convertToUser(this._repository.updateStatus(id, status));
  }

  private convertToUserDto(user: User): UserDto {
    return new UserDto(user.name);
  }

  private convertToUser(userDto: UserDto): User {
    const user = new UserBuilder()
      .setId(userDto.id)
      .setName(userDto.name)
      .setType(userDto.status)
      .build();

    return user;
  }
}

export default UserService;