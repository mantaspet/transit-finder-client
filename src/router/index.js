import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import guards from './guards';

Vue.use(Router);

export default new Router({
  mode: process.env.VUE_APP_HTML_HISTORY_MODE ? 'history' : '',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: guards.loginGuard,
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // webpackChunkName says what will the import look like in the network tab.
      component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
      beforeEnter: guards.authGuard,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
      beforeEnter: guards.adminGuard,
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue'),
      beforeEnter: guards.adminGuard,
    },
  ],
});
