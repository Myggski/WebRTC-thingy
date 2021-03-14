import { io, Socket } from 'socket.io-client';

export const getNewSocket = (): Socket => io('http://localhost:1337').connect();
