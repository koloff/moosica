import RoomMusicStore from './room-music-store';

export default class RoomStore{
  constructor(roomId) {
    this.state = {
      roomId: roomId,
      users: []
    };

    this.roomMusicStore = new RoomMusicStore(roomId);
  }
}