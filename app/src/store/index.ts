import { createStore } from 'vuex';
import RoomModule from './room';

const store = createStore({});
export const roomModule = new RoomModule({ store, name: 'room' });

export default store;
