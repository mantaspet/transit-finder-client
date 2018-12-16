/* eslint-disable arrow-parens */
import Vue from 'vue';
import '@babel/polyfill';
import './plugins/vuetify';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import filters from './filters';
import helpers from './helpers';
import axios from './axios-config';
import veeValidate from './vee-validate-config';
import i18n from './i18n/i18n-config';

Vue.use(veeValidate, {});
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$eventBus = new Vue();

filters.registerFilters(Vue);
helpers.registerHelpers(Vue);

new Vue({
  store,
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app');
