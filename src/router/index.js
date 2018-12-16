import Vue from 'vue';
import Router from 'vue-router';
import Transits from '../views/Transits.vue';
import Transit from '../views/Transit.vue';

Vue.use(Router);

export default new Router({
  mode: process.env.VUE_APP_HTML_HISTORY_MODE ? 'history' : '',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      component: Transits,
    },
    {
      path: '/posts/:id',
      component: Transit,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
