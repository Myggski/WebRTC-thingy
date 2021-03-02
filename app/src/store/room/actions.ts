import api from 'api';
import { ActionTree } from 'vuex';
import { RoomState, Room } from './types';
import { RootState } from '../types';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<RoomState, RootState> = {
  /**
   * Find room by name first in state, else do a request
   * @param state - RoomState
   * @param name - Name of the room
   */
  findRoomByName({ state }, name: string): Room | Promise<AxiosResponse> {
    const stateRoom = state?.rooms?.find(r => r.name === name);

    if (stateRoom) {
      return stateRoom;
    }

    return api.get(`room/${name}`);
  },
  /**
   * Checking if the room already exist, and adding it it does not
   * @param commit and state - To save the room in state, and check if the room exist in state
   * @param room - Room-object to add
   */
  addRoom({ commit, state }, room: Room) {
    const stateRoom = state?.rooms?.find(r => r.name === room.name);

    if (stateRoom) {
      throw new Error('Room already exists');
    }

    commit('ADD_ROOM', room);

    return api.post('room', room);
  },
  /**
   * Removing the room if it exist
   * @param commit and state - To remove the room in state, and check if the room exist in state
   * @param name - Name of the room to remove
   */
  removeRoomByName({ commit, state }, name: string) {
    const stateRoom = state?.rooms?.find(r => r.name === name);

    if (stateRoom) {
      commit('REMOVE_ROOM', name);

      return api.delete('room', {
        data: {
          name,
        },
      });
    }

    throw new Error('Room does not exist');
  },
  /**
   * Get the rooms
   * @param commit and state - To get and set the room-list
   */
  getRooms({ commit, state }) {
    const stateRooms = state?.rooms;

    return stateRooms?.length
      ? stateRooms
      : api.get('room').then(response => {
          commit('SET_ROOMS', response.data);
        });
  },
};
