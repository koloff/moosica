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
            <div style="border: 1px solid green" class="col-xs-8">
              <h6 class="uk-panel-title">{{title}}</h6>

              <h5>
                <a href="#" class="uk-button uk-button-large uk-button-success">
                  <i class="uk-icon-thumbs-up"></i> 0
                </a>
                <b>{{viewCount}}</b> views | <b>{{duration | videoDuration}}</b></h5>

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

      console.log($('.img-col').find('.video-img')[0].clientWidth);
      console.log($('.img-col'));
      $('.img-col').css({
        'width': $('.img-col').find('.video-img')[0].clientWidth + 'px'
      })
    }
  }
</script>
