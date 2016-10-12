<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="input-group">
          <input @input="queryChanged" type="text" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
        <button class="btn btn-default" type="button">Go!</button>
      </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import store from '../../../store';
  import {VideoSearch} from '../../../http-apis/youtube';

  export default {
    name: 'SearchBar',
    data() {
      return {
        videoSearchState: store.videoSearchStore.state
      }
    },
    methods: {

      queryChanged: _.debounce(function(ev) {
        let queryValue = ev.target.value;
        store.videoSearchStore.setQuery(queryValue);
        this.searchVideos();
      }, 500),


      async searchVideos() {
        let search = new VideoSearch(this.videoSearchState.query, 10);
        let results = await search.fetchNextPage();
        console.log(results);
        store.videoSearchStore.setResults(results);
      },


    }
  }
</script>