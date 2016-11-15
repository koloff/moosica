<template>
  <div>


    <div v-for="video in roomMusicState.queue">
      <video-in-client-queue
        :title="video.snippet.title"
        :thumbnailUrl="video.snippet.thumbnails.default.url"
        :viewCount="video.statistics.viewCount"
        :duration="video.contentDetails.duration"
      />
    </div>

  </div>
</template>

<script>
  import store from '../../../store';
  import VideoInClientQueue from '../../videos/VideoInClientQueue.vue';

  export default {
    name: 'QueueList',
    components: {VideoInClientQueue},
    data() {
      return {
        roomMusicState: store.roomStore.roomMusicStore.state
      }
    },

    created() {
            console.log(this.roomMusicState.queue);
    }
  }
</script>