import { createStore } from 'vuex';
import { rooms } from './room';
import { RootState } from './types';

export default createStore<RootState>({
  state: {
    version: '1.0.0',
  },
  mutations: {},
  actions: {},
  modules: {
    rooms,
  },
});
