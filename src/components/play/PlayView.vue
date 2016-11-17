<template>
  <div>
    <br><br>
    <div style="text-align: center">
      <h1>moosica.club/{{this.roomState.roomId}}</h1><br>
      <div id="player"></div>
    </div>

  </div>
</template>

<script>
  import rootStore from '../../store';

  export default {
    name: 'PlayView',
    data() {
      rootStore.createUserStore();
      rootStore.createRoomStore(this.$route.params.roomId);

      return {
        userState: rootStore.userStore.state,
        roomState: rootStore.roomStore.state,
        roomMusicState: rootStore.roomStore.roomMusicStore.state,
        currentlyPlayingVideo: null,
        player: null
      }
    },
    created() {
      this.initPlayer();
    },
    methods: {
      playMostRatedVideo() {
        if (this.roomMusicState.queue.length === 0) {
          // sorry for this todo fix
          window.setTimeout(this.playMostRatedVideo, 100);
        } else {
          this.currentlyPlayingVideo = this.roomMusicState.queue[0];
          this.player.loadVideoById(this.currentlyPlayingVideo.video.id);
          this.player.playVideo();
        }
      },
      initPlayer() {
        console.log('initvideo');

        let onPlayerReady = (event) => {
          this.playMostRatedVideo();
        };

        let onPlayerStateChange = async(event) => {
          if (this.player.getPlayerState() === 0) {
            // remove current video from list
            await rootStore.roomStore.roomMusicStore.removeVideoFromList(this.currentlyPlayingVideo.key);
            // play next video
            this.playMostRatedVideo();
          }
        };

        window.onYouTubeIframeAPIReady = () => {
          console.log('IFRAME READY');
          this.player = new YT.Player('player', {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        };

      },
    }
  }
</script>