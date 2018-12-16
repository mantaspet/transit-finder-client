/* eslint-disable no-mixed-operators */
import axios from 'axios';
import router from '../../../router/index';

export default {
  handleAuthData({ commit, dispatch }, payload) {
    const now = new Date();
    const tokenExpiresAt = new Date(now.getTime() + payload.expires_in * 1000);
    // refresh access token when there's less than 1/3rd left on its validity time
    const refreshAt = new Date(now.getTime() + payload.expires_in * 666);
    commit('storeAuthData', {
      tokenExpiresAt,
      accessToken: payload.access_token,
    });
    dispatch('getCurrentUser');
    localStorage.setItem('accessToken', payload.access_token);
    localStorage.setItem('refreshToken', payload.refresh_token);
    localStorage.setItem('refreshTokenAt', refreshAt.toString());
    localStorage.setItem('tokenExpiresAt', tokenExpiresAt.toString());
    router.replace('/');
  },

  login({ commit, dispatch }, authData) {
    commit('showProgressBar');
    axios
      .post('oauth/token', {
        scope: process.env.VUE_APP_SCOPE,
        grant_type: process.env.VUE_APP_GRANT_TYPE,
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        username: authData.username,
        password: authData.password,
      })
      .then((res) => {
        dispatch('handleAuthData', res.data);
      })
      .finally(() => {
        commit('hideProgressBar');
      });
  },

  refreshToken({ commit, dispatch }, refreshToken) {
    axios
      .post('oauth/token', {
        scope: process.env.VUE_APP_SCOPE,
        grant_type: 'refresh_token',
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        refresh_token: refreshToken,
      })
      .then((res) => {
        dispatch('handleAuthData', res.data);
      })
      .catch(() => {
        commit('openSnackbar', {
          text: 'Pasibaigė prieigos rakto galiojimo laikas. Prašome prisijungti iš naujo.',
        });
        commit('logout');
      });
  },

  tryAutoLogin({ commit, dispatch }) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    let refreshAt = localStorage.getItem('refreshTokenAt');
    if (refreshAt) {
      refreshAt = new Date(refreshAt);
    }
    const now = new Date();
    if (!refreshAt || now.getTime() >= refreshAt.getTime()) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        dispatch('refreshToken', refreshToken);
      }
      return;
    }
    let tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
    if (tokenExpiresAt) {
      tokenExpiresAt = new Date(tokenExpiresAt);
    }
    commit('storeAuthData', {
      tokenExpiresAt,
      accessToken,
    });
    const impersonator = JSON.parse(localStorage.getItem('impersonator'));
    if (impersonator) {
      const impersonatingAs = JSON.parse(localStorage.getItem('currentUser'));
      if (impersonatingAs) {
        commit('setImpersonatedUser', impersonatingAs.id);
      } else {
        localStorage.removeItem('impersonator');
      }
    }
    dispatch('getCurrentUser');
  },

  getCurrentUser({ state, commit, dispatch }) {
    if (!state.accessToken) {
      return;
    }
    axios.get('api/user/current').then((res) => {
      commit('storeCurrentUser', res.data);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      dispatch('continueNavigation');
    });
  },

  continueNavigation({ state }) {
    if (state.initialRoute) {
      router.replace(state.initialRoute);
    }
  },

  impersonateUser({ state, commit, dispatch }, id) {
    commit('setImpersonatedUser', id);
    commit('setInitialRoute', null);
    localStorage.setItem('impersonator', JSON.stringify(state.currentUser));
    dispatch('getCurrentUser');
  },

  stopImpersonating({ commit }) {
    const impersonator = JSON.parse(localStorage.getItem('impersonator'));
    commit('stopImpersonating', {
      impersonator,
    });
    localStorage.setItem('currentUser', JSON.stringify(impersonator));
    localStorage.removeItem('impersonator');
  },
};
