import api from '@/core/api';
import { User } from './types';
import { AxiosResponse } from 'axios';
import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules';

@Module
export default class UserModule extends VuexModule {
  _users: User[] = [];

  /**
   * Getter - List of users
   * stringify and parse user, WHY?! - https://stackoverflow.com/questions/64753224/vuex-state-array-turning-an-proxy-object-when-it-is-mutated
   */
  get users(): User[] {
    const stringifiedUsers = JSON.stringify(this._users);
    return JSON.parse(stringifiedUsers);
  }

  /**
   * Adding a user to the users
   * If there's a user with the same name, throw error
   * @param user
   */
  @Mutation
  addUser(user: User): void {
    const stateUser = this._users?.find(r => r.name === user.name);

    if (stateUser) {
      throw new Error('User already exists');
    }

    this._users.push(user);
  }

  /**
   * Removing user from users
   * @param index of the user in the user list that is about to be removed
   */
  @Mutation
  removeUser(index: number): void {
    this._users.splice(index, 1);
  }

  /**
   * Sets a new list of users
   * @param users
   */
  @Mutation
  setUserList(users: User[]): void {
    this._users = users.slice(0);
  }

  /**
   * Find user by name first in state, else do a request
   * @param state - UserState
   * @param name - Name of the user
   */
  @Action
  findUserById(id: string): User | Promise<AxiosResponse> {
    const stateUser = this._users?.find(r => r.id === id);

    if (stateUser) {
      return stateUser;
    }

    return api.get(`user/${name}`);
  }

  /**
   * Checking if the user already exist, and adding it it does not
   * @param commit and state - To save the user in state, and check if the user exist in state
   * @param user - User-object to add
   */
  @Action
  createUser(name: string): Promise<User | void> {
    const stateUser = this._users?.find(r => r.name === name);

    if (stateUser) {
      throw new Error('User already exists');
    }

    return api.post('user', name).then(response => {
      this.addUser(response.data as User);
    });
  }

  /**
   * Removing the user if it exist
   * @param commit and state - To remove the user in state, and check if the user exist in state
   * @param name - Name of the user to remove
   */
  @Action
  removeUserById(id: string): Promise<User> {
    const userIndex = this._users?.findIndex(r => r.id === id);

    if (userIndex > -1) {
      this.removeUser(userIndex);

      return api.delete('user', {
        data: {
          name,
        },
      });
    }

    throw new Error('User does not exist');
  }

  /**
   * Get the users
   * TODO: Add try-catch or another kind of error handling
   * @param commit and state - To get and set the user-list
   */
  @Action
  async getUsers(): Promise<User[]> {
    if (!this._users?.length) {
      const response = await api.get('user');
      this.setUserList(response.data.data);
    }

    return this.users;
  }
}
