import { Module } from 'vuex';
import { actions } from './actions';
import { RoomState } from './types';
import { RootState } from '../types';

export const state: RoomState = {
  rooms: [],
};

const namespaced = true;

export const rooms: Module<RoomState, RootState> = {
  namespaced,
  state,
  actions,
};
