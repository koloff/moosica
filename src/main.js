import 'babel-polyfill';
import Vue from 'vue';
import Root from './Root.vue';

import 'bootstrap/dist/js/bootstrap';
import './style/custom-bootstrap.less'
import 'animate.css';

// load js utils
import './utils/index';

// load firebase
import './config/firebase';

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

  let db = firebase.database().roomRef();

  db.set({
    rooms: {
      testroom1: {
        host: 'user2',
        users: [
          {
            id: 'quest111',
            roles: []
          },
          {
            id: 'user2',
            roles: ['host']
          }
        ],
        music: {
          currentlyPlaying: {
            id: 'asdasdas',
            duration: 243221,
            currentMs: 12345,
            loves: 3,
          }
        }
      },
    },
    users: {
      'quest111': {
        username: 'Pesho111',
        rooms: 'testroom1'
      },
      'user2': {
        username: 'Vankataa',
        rooms: 'testroom1'
      }
    }
  })

}

// seedFirebase();