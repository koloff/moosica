import Vue from 'vue';
import serializeVideoDuration from '../utils/serialize-video-duration';


export default Vue.filter('videoDuration', function(str) {
  let serialized = serializeVideoDuration(str);

  let result = '';
  if (serialized.hours > 0) {
    result += `${serialized.hours}:`;
    result += (serialized.minutes < 10 ? '0' : '') + `${serialized.minutes}:`;
  }
  else if (serialized.minutes > 0) {
    result += (serialized.minutes < 10 ? '0' : '') + `${serialized.minutes}:`;
  }
  result += (serialized.seconds < 10 ? '0' : '') + `${serialized.seconds}`;


  return result;
});
