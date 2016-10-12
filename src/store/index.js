import RoomStore from './room/room-store';
import VideoSearchStore from './search/video-search-store';


export default {
  createRoomStore(roomId) {
    this.roomStore = new RoomStore(roomId);
  },

  createVideoSearchStore() {
    this.videoSearchStore = new VideoSearchStore();
  }
}
