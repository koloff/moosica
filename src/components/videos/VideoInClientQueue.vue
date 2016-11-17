<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="well well-sm video-well">
          <div class="row">
            <div class="col-xs-4 img-col">
              <img class="img-responsive video-img" :src="thumbnailUrl"
                   :alt="title">
            </div>
            <div class="col-xs-5">
              <h5 class="uk-panel-title">{{title}}</h5>

              <h6><strong>{{viewCount}}</strong> views | <b>{{duration | videoDuration}}</b></h6>

              <div>
                <a @click="upvote()" href="#" class="btn btn-success btn-sm">
                  <i class="glyphicon glyphicon-heart"></i>
                  Upvote
                </a>
              </div>
            </div>
            <div class="col-xs-3" style="text-align: center">
              <h2>{{Object.keys(votes).length}}</h2>
              VOTES
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rootStore from '../../store';
  import notifier from '../../utils/notifier';
  
  
  export default {
    name: 'VideoInClientQueue',
    props: ['videoKey', 'title', 'thumbnailUrl', 'viewCount', 'duration', 'votes'],
    mounted() {

      //      console.log($('.img-col').find('.video-img')[0].clientWidth);
      //      console.log($('.img-col'));
      //      $('.img-col').css({
      //        'width': $('.img-col').find('.video-img')[0].clientWidth + 'px'
      //      })
    },
    methods: {
      async upvote() {
        try {
          await rootStore.roomStore.roomMusicStore.upvoteVideo(this.videoKey);
          notifier('success', 'You voted!');
        } catch(err) {
          notifier('error', 'You have already voted!');
        }
      }
    }
  }
</script>
