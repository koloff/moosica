import UserStore from './user';
import RoomStore from './room/room-store';
import VideoSearchStore from './search/video-search-store';
import videosStore from './videos';

export default {
  videosStore: videosStore,

  createUserStore() {
    this.userStore = new UserStore();
  },

  createRoomStore(roomId) {
    this.roomStore = new RoomStore(roomId);
  },

  createVideoSearchStore() {
    this.videoSearchStore = new VideoSearchStore();
  }
}
