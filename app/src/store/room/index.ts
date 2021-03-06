import api from 'api';
import { Room } from './types';
import { AxiosResponse } from 'axios';
import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules';

@Module
export default class RoomModule extends VuexModule {
  _rooms: Room[] = [];

  /**
   * Getter - List of rooms
   * stringify and parse room, WHY?! - https://stackoverflow.com/questions/64753224/vuex-state-array-turning-an-proxy-object-when-it-is-mutated
   */
  get rooms() {
    const stringifiedRooms = JSON.stringify(this._rooms);
    return JSON.parse(stringifiedRooms);
  }

  /**
   * Adding a room to the rooms
   * If there's a room with the same name and type, throw error
   * @param room
   */
  @Mutation
  addRoom(room: Room) {
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
  removeRoom(index: number) {
    this._rooms.splice(index, 1);
  }

  /**
   * Sets a new list of rooms
   * @param rooms
   */
  @Mutation
  setRoomList(rooms: Room[]) {
    this._rooms = rooms.slice(0);
  }

  /**
   * Find room by name first in state, else do a request
   * @param state - RoomState
   * @param name - Name of the room
   */
  @Action
  findRoomById(id: string): Room | Promise<AxiosResponse> {
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
  createRoom(room: Room) {
    const stateRoom = this._rooms?.find(
      r => r.name === room.name && r.type === room.type,
    );

    if (stateRoom) {
      throw new Error('Room already exists');
    }

    this.addRoom(room);

    return api.post('room', room);
  }

  /**
   * Removing the room if it exist
   * @param commit and state - To remove the room in state, and check if the room exist in state
   * @param name - Name of the room to remove
   */
  @Action
  removeRoomById(id: string) {
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
   * @param commit and state - To get and set the room-list
   */
  @Action
  async getRooms(): Promise<Room[]> {
    if (!this._rooms?.length) {
      const response = await api.get('room');
      this.setRoomList(response.data.data);
    }

    return this.rooms;
  }
}
