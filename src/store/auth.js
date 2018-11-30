/* eslint-disable no-shadow,consistent-return,prefer-promise-reject-errors,no-param-reassign,
no-undef */
import axios from 'axios';

const state = {
  accessToken: null,
  tokenExpiresAt: null,
  currentUser: null,
};

const getters = {
  currentUser(state) {
    return state.currentUser;
  },

  accessToken(state) {
    return state.accessToken;
  },

  isAuthenticated(state) {
    const now = new Date();
    return state.accessToken
      && state.tokenExpiresAt
      && now.getTime() < state.tokenExpiresAt.getTime();
  },
};

const mutations = {
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },
};

const actions = {
  loginWithFacebook({ commit }) {
    return new Promise((resolve, reject) => {
      FB.login((result) => {
        console.log(result);
        if (result.authResponse) {
          return axios.post('auth/facebook', { access_token: result.authResponse.accessToken })
            .then((res) => {
              // TODO: needs work
              console.log(res);
              const token = res.headers['x-auth-token'];
              if (token) {
                commit('setAccessToken', token);
                localStorage.setItem('accessToken', token);
              }
              resolve(res);
            })
            .catch(() => reject());
        }
        reject();
      }, { scope: 'public_profile,email' });
    });
  },

  logout({ commit }) {
    commit('setAccessToken', null);
    localStorage.removeItem('accessToken');
  },

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(() => resolve(true)).catch(() => reject(false));
    });
  },

  getCurrentUser() {
    return new Promise((resolve, reject) => axios.get('api/auth/me').then((res) => {
      resolve(res);
    }).catch(() => reject()));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
