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
            <div class="col-xs-6">
              <h5 class="uk-panel-title">{{title}}</h5>

              <h6><strong>{{viewCount}}</strong> views | <b>{{duration | videoDuration}}</b></h6>

              <div>
                <a href="#" class="btn btn-success btn-sm">
                  <i class="glyphicon glyphicon-thumbs-up"></i>
                  Upvote
                </a>
              </div>
            </div>
            <div class="col-xs-2">
              <h2>1</h2>
              POSITION
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VideoInClientQueue',
    props: ['title', 'thumbnailUrl', 'viewCount', 'duration'],
    mounted() {

      //      console.log($('.img-col').find('.video-img')[0].clientWidth);
      //      console.log($('.img-col'));
      //      $('.img-col').css({
      //        'width': $('.img-col').find('.video-img')[0].clientWidth + 'px'
      //      })
    }
  }
</script>
