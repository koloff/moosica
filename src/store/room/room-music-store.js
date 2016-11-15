import RoomMusicRepository from '../../repositories/room-music-repo';
import {fetchVideoDetails} from '../../http-apis/youtube';


export default class RoomMusicStore {

  constructor(roomId) {
    this.state = {
      queue: []
    };

    try {
      this.roomMusicRepository = new RoomMusicRepository(roomId);
      this.initRepositoryListeners();
    } catch (err) {
      console.error(err);
      throw 'INVALID_ROOM';
    }
  }

  initRepositoryListeners() {

    this.roomMusicRepository.on('added', async(snap) => {
      console.log('added', snap);
      let videoDetails = await fetchVideoDetails(snap.value);
      if (videoDetails.items.length > 0) {
        this.state.queue.push(videoDetails.items[0]);
      }
    });

  }

  async addToQueue(videoId) {
    return this.roomMusicRepository.addSongIdToQueue(videoId);
  }

  async voteForVideo(videoId) {

  }

}