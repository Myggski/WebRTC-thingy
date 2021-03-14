import {
  VuexModule,
  Mutation,
  Module,
  RegisterOptions,
  Action,
} from 'vuex-class-modules';
import { Socket } from 'socket.io-client';
import { getNewSocket } from '../../core/sockets';

@Module
export default class SocketModule extends VuexModule {
  private _socket: Socket;

  constructor(option: RegisterOptions) {
    super(option);

    this.setNewSocket();
  }

  public get socket() {
    return this._socket;
  }

  @Action
  public disconnect() {
    this._socket.disconnect();
  }

  @Mutation
  private setNewSocket() {
    this._socket = getNewSocket();
  }
}
