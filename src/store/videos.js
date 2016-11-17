import * as youTubeHttp from '../http-apis/youtube';

export default {
  state: {
    videos: {}
  },

  async getVideoDetails(videoId) {
    if (!this.state.videos[videoId]) {
      let res = await youTubeHttp.fetchVideoDetails(videoId);
      console.log(res);
      this.state.videos[videoId] = res.items[0];
      console.log(this.state.videos[videoId]);
    }
    return this.state.videos[videoId];
  }
}