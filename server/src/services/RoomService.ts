import Service from './Service';
import Room from '../models/Room/Room';
import RoomBuilder from '../models/Room/RoomBuilder';
import RoomDto from '../models/Room/RoomDto';
import RoomRepository from '../repositories/RoomRepository';

// TODO: Validate values better, and handle error better
class RoomService implements Service<Room> {
  private readonly _repository: RoomRepository;

  constructor() {
    this._repository = new RoomRepository();
  }

  getList(): Room[] {
    return this._repository.getList().map(this.convertToRoom);
  }

  findById(id: string): Room {
    return this.convertToRoom(this._repository.findById(id));
  }

  create(entity: Room): Room {
    return this.convertToRoom(this._repository.create(this.convertToRoomDto(entity)));
  }

  delete(id: string): void {
    this._repository.delete(id);
  }

  private convertToRoomDto(room: Room): RoomDto {
    return new RoomDto(room.name, room.type);
  }

  private convertToRoom(roomDto: RoomDto): Room {
    const room = new RoomBuilder()
      .setId(roomDto.id)
      .setName(roomDto.name)
      .setType(roomDto.type)
      .build();

    return room;
  }
}

export default RoomService;