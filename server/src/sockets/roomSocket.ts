import { Socket } from 'socket.io';

export const joinRoomListener = (socket: Socket) => {
  socket.on('join-room', (userName: string, roomId: string) => {
    console.log(userName);
    console.log(roomId);
  });
};

export const leaveRoomListener = (socket: Socket) => {
  socket.on('leave-room', (userName: string, roomId: string) => {
    console.log(userName);
    console.log(roomId);
  });
};