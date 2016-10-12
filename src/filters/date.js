import Vue from 'vue';

export default Vue.filter('date', function(dateStr) {

  let date = new Date(dateStr);

  let yyyy = date.getFullYear().toString();
  let mm = date.getMonth(); // getMonth() is zero-based
  let dd = date.getDate().toString();

  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  return `${dd} ${months[mm]} ${yyyy}`;

});
