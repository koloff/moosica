<template>
  <div>

    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well well-sm video-well">
          <div class="row">
            <div class="col-xs-4 img-col">
              <img class="img-responsive video-img" :src="thumbnails.default.url"
                   :alt="title">
            </div>
            <div class="col-xs-6">
              <h5 class="uk-panel-title">{{title}}</h5>

              <h6><strong>{{viewCount}}</strong> views | <b>{{duration | videoDuration}}</b></h6>

              <div>
                <a @click="suggestSong()" href="#" class="btn btn-success btn-sm">
                  <i class="glyphicon glyphicon-star"></i>
                  Choose
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import store from '../../store';
  import notifier from '../../utils/notifier';

  export default {
    name: 'VideoSearchSuggestion',
    props: ['id', 'title', 'thumbnails', 'publishedAt', 'duration', 'viewCount', 'likeCount', 'dislikeCount'],
    methods: {
      async suggestSong() {
        let res = await store.roomStore.roomMusicStore.addToQueue({
          id: this.id,
          title: this.title
        });
        notifier('success', 'The video was suggested!')
      }
    }
  }
</script>