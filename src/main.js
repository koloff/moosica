import 'babel-polyfill';
import Vue from 'vue';
import Root from './Root.vue';

import 'bootstrap/dist/js/bootstrap';
import './style/custom-bootstrap.less'
import 'animate.css';

// load js utils
import './utils/index';

// load firebase
require('./config/firebase');

// YouTube repositories key
window.youTubeKey = 'AIzaSyDikb5e3dv3mgc_FFOqCp9tmv3DTG4R2Gc';

// get routes
import router from './router';

// import filters
import './filters/index';

let vue = new Vue({
  router,
  el: '#app',
  render: h => h(Root)
});

window.vue = vue;

import firebase from 'firebase';


function seedFirebase() {
  console.log(firebase.database() );

  let db = firebase.database().ref();

  db.set({
    rooms: {
      'uchi-ban': {
        songs: [
          1,2,3
        ]
      }
    }
  }).then((err, res) => {console.log(arguments);})

}

// seedFirebase();