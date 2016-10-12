import request from 'superagent';
import _ from 'lodash';

// export function fetchVideoDetails(videoId) {
//
//   console.log(arguments);
//   return new Promise((resolve, reject) => {
//
//     request
//       .get('https://www.googleapis.com/youtube/v3/videos')
//       .query({
//         part: 'snippet, contentDetails, statistics',
//         id: videoId,
//         fields: `items(id, snippet(title, thumbnails), contentDetails/duration, statistics(viewCount, likeCount, dislikeCount))`,
//         key: window.youTubeKey
//       })
//       .end((err, res) => {
//         if (err) {
//           return reject(err.body);
//         }
//
//
//         console.log(res.body);
//         return resolve(res.body);
//       })
//   });
// }

export class VideoSearch {
  constructor(query, countPerPage) {
    this.query = query;
    this.countPerPage = countPerPage;
    this.key = window.youTubeKey;
  }

  fetchVideosDetails(ids) {
    return new Promise((resolve, reject) => {
      request
        .get('https://www.googleapis.com/youtube/v3/videos')
        .query({
          part: 'contentDetails,statistics',
          id: ids,
          fields: `items(id,contentDetails/duration,statistics(viewCount,likeCount,dislikeCount))`,
          key: this.key
        })
        .end((err, res) => {
          if (err) {
            return reject(err.body);
          }

          return resolve(res.body);
        });
    });
  }

  fetchResults() {
    return new Promise((resolve, reject) => {
      request
        .get('https://www.googleapis.com/youtube/v3/search')
        .query({
          part: 'snippet',
          type: 'video',
          q: this.query,
          maxResults: this.countPerPage,
          key: this.key,
          pageToken: this.nextPageToken ? this.nextPageToken : null,
          fields: `nextPageToken,items(id/videoId,snippet/title,snippet/thumbnails,snippet/publishedAt)`
        })
        .end((err, res) => {
          if (err) {
            return reject(err.body);
          }

          return resolve(res.body);
        });
    });
  }

  async fetchNextPage() {
    let videoResults = await this.fetchResults();
    this.nextPageToken = videoResults.nextPageToken;

    let resultsIds = videoResults.items.map(item => item.id.videoId);
    let videosDetails = await this.fetchVideosDetails(resultsIds.join(','));

    let result = [];
    videoResults.items.forEach((item, index) => {
      let extendedDetailsVideo = _.extend(item, videosDetails.items[index]);
      console.log(extendedDetailsVideo);
      result.push({
        id: extendedDetailsVideo.id,
        title: extendedDetailsVideo.snippet.title,
        duration: extendedDetailsVideo.contentDetails.duration,
        publishedAt: extendedDetailsVideo.snippet.publishedAt,
        thumbnails: extendedDetailsVideo.snippet.thumbnails,
        viewCount: extendedDetailsVideo.statistics.viewCount,
        likeCount: extendedDetailsVideo.statistics.likeCount,
        dislikeCount: extendedDetailsVideo.statistics.dislikeCount
      })
    });

    return result;
  }
}