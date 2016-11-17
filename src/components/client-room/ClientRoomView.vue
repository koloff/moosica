<template>
  <div>

    <div id="test" class="text-center">
      <h2 class="text-center">moosica.club/{{roomState.roomId}}</h2>
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
    <br><br>


    <!--<transition-->
      <!--name="custom-classes-transition"-->
      <!--enter-active-class="animated zoomIn"-->
      <!--leave-active-class="animated zoomOut">-->
      <div v-if="currentView === 'suggest-song'">
        <search-bar></search-bar>
        <br>

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
      <!--enter-active-class="animated zoomIn"-->
      <!--leave-active-class="animated zoomOut">-->
      <div v-if="currentView === 'queue'">
        <queue-list></queue-list>
      </div>
    <!--</transition>-->



  </div>
</template>

<script>
  import SearchBar from '../search/videos-suggestions/SearchBar.vue';
  import VideoSearchSuggestion from '../videos/VideoSearchSuggestion.vue';
  import QueueList from '../client-room/queue/QueueList.vue';
  import rootStore from '../../store';
  import expensiveTimeout from '../../utils/expensive-timeout';


  export default {
    name: 'RoomView',
    components: {SearchBar, VideoSearchSuggestion, QueueList},
    data () {
      rootStore.createUserStore();
      rootStore.createRoomStore(this.$route.params.roomId);
      rootStore.createVideoSearchStore();
      return {
        userState: rootStore.userStore.state,
        roomState: rootStore.roomStore.state,
        videoSearchState: rootStore.videoSearchStore.state,
        roomMusicState: rootStore.roomStore.roomMusicStore.state,
        currentView: 'queue'
      }
    },

    methods: {

    }
  }
</script>
