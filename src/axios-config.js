/* eslint-disable no-param-reassign,arrow-parens */
import axios from 'axios';
import store from './store/index';
import i18n from './i18n/i18n-config';

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

axios.interceptors.request.use((config) => {
  if (store.getters.isAuthenticated) {
    config.headers.common['x-auth-token'] = store.getters.accessToken;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    store.commit('hideProgressBar');
    const mutation = 'openSnackbar';
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400: {
          store.commit(mutation, { text: i18n.t('bad_request') });
          throw error;
        }
        case 401: {
          store.commit(mutation, {
            text: 'Prašome prisijungti',
          });
          store.dispatch('logout');
          throw error;
        }
        case 403: {
          store.commit(mutation, { text: i18n.t('access_forbidden') });
          throw error;
        }
        case 404: {
          store.commit(mutation, { text: i18n.t('page_not_found') });
          throw error;
        }
        case 409: {
          store.commit(mutation, { text: i18n.t('server_state_conflict') });
          throw error;
        }
        case 422: {
          store.commit(mutation, { text: i18n.t('validation_error') });
          throw error;
        }
        case 429: {
          store.commit(mutation, { text: i18n.t('bad_request') });
          throw error;
        }
        case 500: {
          if (error.response.data.message.indexOf('login') > -1) {
            store.commit('logout');
          } else {
            store.commit(mutation, {
              text: `${i18n.t('internal_server_error')}.`,
            });
          }
          throw error;
        }
        default: {
          store.commit(mutation, { text: i18n.t('unexpected_error') });
          throw error;
        }
      }
    } else if (typeof error === 'string') {
      store.commit(mutation, { text: error });
    }
  },
);

export default axios;
