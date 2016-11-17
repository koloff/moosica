<template>
  <div>


    <div v-for="obj in roomMusicState.queue">
      <video-in-client-queue
        :videoKey="obj.key"
        :title="obj.video.snippet.title"
        :thumbnailUrl="obj.video.snippet.thumbnails.default.url"
        :viewCount="obj.video.statistics.viewCount"
        :duration="obj.video.contentDetails.duration"
        :votes="obj.votes"
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
    }
  }
</script>