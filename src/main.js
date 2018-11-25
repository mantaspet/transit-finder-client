import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.interceptors.request.use((config) => {
  const editedConfig = config;
  if (store.getters.accessToken) {
    editedConfig.headers.common['x-auth-token'] = `Bearer ${store.getters.accessToken}`;
  }
  return editedConfig;
});
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
