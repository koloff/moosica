<template>
  <div>

    <div id="test" class="text-center">
      <h1 class="text-center">moosica.club/kolov</h1>
    </div>


    <div class="row">
      <div class="col-xs-12 text-center">
        <button @click="currentView = 'suggest-song'" class="btn btn-primary btn-success">
          <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          Suggest song
        </button>
        <button @click="currentView = 'queue'" class="btn btn-primary btn-info">
          <span class=" glyphicon glyphicon-headphones" aria-hidden="true"></span>
          Queue
        </button>
      </div>
    </div>



    <!--<transition-->
      <!--name="custom-classes-transition"-->
      <!--enter-active-class="animated bounceIn"-->
      <!--leave-active-class="animated bounceOut">-->
      <div v-if="currentView === 'suggest-song'">
        <search-bar></search-bar>

        <video-search-suggestion
          v-for="video in videoSearchState.results"
          :id="video.id"
          :title="video.title"
          :thumbnails="video.thumbnails"
          :publishedAt="video.publishedAt"
          :duration="video.duration"
          :viewCount="video.viewCount"
          :likeCount="video.likeCount"
          :dislikeCount="video.dislikeCount"
        ></video-search-suggestion>

      </div>
    <!--</transition>-->


    <!--<transition-->
      <!--name="custom-classes-transition"-->
      <!--enter-active-class="animated bounceIn"-->
      <!--leave-active-class="animated bounceOut">-->
      <div v-if="currentView === 'queue'">
        <queue-list></queue-list>
      </div>
    <!--</transition>-->


    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <!--<div id="player"></div>-->



  </div>
</template>

<script>
  import SearchBar from '../search/videos-suggestions/SearchBar.vue';
  import VideoSearchSuggestion from '../videos/VideoSearchSuggestion.vue';
  import QueueList from '../client-room/queue/QueueList.vue';
  import rootStore from '../../store';
  import expensiveTimeout from '../../utils/expensive-timeout';
  import {fetchVideoDetails} from '../../http-apis/youtube';


  export default {
    name: 'RoomView',
    components: {SearchBar, VideoSearchSuggestion, QueueList},
    data () {
      rootStore.createRoomStore('testroom1');
      rootStore.createVideoSearchStore();
      return {
        videoSearchState: rootStore.videoSearchStore.state,
        roomMusicState: rootStore.roomStore.roomMusicStore.state,
        currentView: 'queue'
      }
    },

    mounted() {
      $('.suggest-songs-window').hide();
    },
    methods: {
      initVideo() {
        console.log('initvideo');
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        let player;

        window.onYouTubeIframeAPIReady = function() {
          console.log('IFRAME READY');
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'hhKp_hldKPM',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        };

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          //          event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;

        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
          }
        }

        function stopVideo() {
          player.stopVideo();
        }
      },
    }
  }
</script>

<style>
  .suggest-songs-window {
    display: none;
  }
</style>
