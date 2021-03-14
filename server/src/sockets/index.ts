import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import Singleton from '../core/abstracts/Singleton';

class ServerSocket extends Singleton<ServerSocket>() {
  private _io: SocketIOServer;
  private _socket: Socket;

  public get socket() {
    return this._socket;
  }

  private setupConnection(socket: Socket) {
    this._socket = socket;
    console.log('new connection id', this._socket.id);
  }

  public initializeSocket(httpServer: HTTPServer): void {
    this._io = new SocketIOServer(httpServer, {
      cors: { origin: 'http://localhost:8080' }
    });

    this._io.on('connection', (socket: Socket) => this.setupConnection(socket));
  };
}

export default ServerSocket.instance;
