<template>
  <div>
    <img :src="thumbnails.medium.url" :alt="title"/>
    <h3>{{title}}</h3>
    <h4>{{viewCount}} views | {{duration | videoDuration}}</h4>
    <button @click="suggestSong()" class="uk-button uk-button-success">choose</button>
  </div>
</template>

<script>
  import store from '../../store';

  export default {
    name: 'VideoSearchSuggestion',
    props: ['id', 'title', 'thumbnails', 'publishedAt', 'duration', 'viewCount', 'likeCount', 'dislikeCount'],
    methods: {
      async suggestSong() {
        let res = await store.roomStore.roomMusicStore.addToQueue(this.id);
      }
    }
  }
</script>