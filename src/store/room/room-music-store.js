import _ from 'lodash';
import rootStore from '../index';
import RoomMusicRepository from '../../repositories/room-music-repo';


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

    // this.roomMusicRepository.on('added-song', async(snap) => {
    //   let videoDetails = await fetchVideoDetails(snap.val().id);
    //   if (videoDetails.items.length > 0) {
    //     this.state.queue.push({
    //       key: snap.key,
    //       video: videoDetails.items[0]
    //     });
    //   }
    // });

    this.roomMusicRepository.on('changed-list', async(snap) => {
      console.log('changed list');
      console.log(snap);
      this.state.queue = [];
      let queue = [];

      for (let key in snap) {
        if (snap.hasOwnProperty(key)) {
          let videoDetails = await rootStore.videosStore.getVideoDetails(snap[key].id);
          queue.push({
            key: key,
            video: videoDetails,
            votes: snap[key].votes
          });
        }
      }

      queue.sort((el1, el2) => Object.keys(el2.votes).length - Object.keys(el1.votes).length)
      this.state.queue = queue;
    });

  }

  addToQueue(video) {
    return this.roomMusicRepository.addSongIdToQueue(video);
  }

  upvoteVideo(videoKey) {
    return this.roomMusicRepository.upvoteVideo(videoKey, rootStore.userStore.state.user.uid);
  }

  removeVideoFromList(videoKey) {
    return this.roomMusicRepository.removeVideoFromList(videoKey);
  }

}