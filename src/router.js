import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/', component: require('./components/App.vue')
    },
    {
      path: '/ui', component: require('./ui/TopVoted.vue')
    },
    {
      path: '/:roomId', component: require('./components/client-room/ClientRoomView.vue')
    }
  ]
});
