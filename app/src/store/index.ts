import { createStore } from 'vuex';
import RoomModule from './room';
import SocketModule from './socket';

const store = createStore({});

export const roomModule = new RoomModule({ store, name: 'room' });
export const socketModule = new SocketModule({ store, name: 'socket' });

export default store;
