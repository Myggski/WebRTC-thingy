import api from '@/core/api';
import { Room } from './types';
import { AxiosResponse } from 'axios';
import {
  VuexModule,
  Mutation,
  Action,
  Module,
  RegisterOptions,
} from 'vuex-class-modules';

@Module
export default class RoomModule extends VuexModule {
  private _rooms: Room[] = [];

  constructor(options: RegisterOptions) {
    super(options);

    this._rooms = [];
  }

  /**
   * Getter - List of rooms
   */
  public get rooms(): Room[] {
    return this._rooms;
  }

  /**
   * Adding a room to the rooms
   * If there's a room with the same name and type, throw error
   * @param room
   */
  @Mutation
  public addRoom(room: Room): void {
    const stateRoom = this._rooms?.find(
      r => r.name === room.name && r.type === room.type,
    );

    if (stateRoom) {
      throw new Error('Room already exists');
    }

    this._rooms.push(room);
  }

  /**
   * Removing room from rooms
   * @param index of the room in the room list that is about to be removed
   */
  @Mutation
  public removeRoom(index: number): void {
    this._rooms.splice(index, 1);
  }

  /**
   * Sets a new list of rooms
   * @param rooms
   */
  @Mutation
  public setRoomList(rooms: Room[]): void {
    this._rooms = rooms.slice(0);
  }

  /**
   * Find room by name first in state, else do a request
   * @param name - Name of the room
   */
  @Action
  public findRoomById(id: string): Room | Promise<AxiosResponse> {
    const stateRoom = this._rooms?.find(r => r.id === id);

    if (stateRoom) {
      return stateRoom;
    }

    return api.get(`room/${name}`);
  }

  /**
   * Checking if the room already exist, and adding it it does not
   * @param commit and state - To save the room in state, and check if the room exist in state
   * @param room - Room-object to add
   */
  @Action
  public createRoom(room: Room): Promise<void> {
    const stateRoom = this._rooms?.find(
      r => r.name === room.name && r.type === room.type,
    );

    if (stateRoom) {
      throw new Error('Room already exists');
    }

    return api
      .post('room', { name: room.name, type: room.type })
      .then(() => this.addRoom(room));
  }

  /**
   * Removing the room if it exist
   * @param commit and state - To remove the room in state, and check if the room exist in state
   * @param name - Name of the room to remove
   */
  @Action
  public removeRoomById(id: string): Promise<Room> {
    const roomIndex = this._rooms?.findIndex(r => r.id === id);

    if (roomIndex > -1) {
      this.removeRoom(roomIndex);

      return api.delete('room', {
        data: {
          name,
        },
      });
    }

    throw new Error('Room does not exist');
  }

  /**
   * Get the rooms
   * TODO: Add try-catch or another kind of error handling
   * @param commit and state - To get and set the room-list
   */
  @Action
  public async getRooms(): Promise<Room[]> {
    if (!this._rooms?.length) {
      const response = await api.get('room');
      this.setRoomList(response.data.data);
    }

    return this.rooms;
  }
}
