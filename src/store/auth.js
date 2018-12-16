/* eslint-disable no-shadow,consistent-return,prefer-promise-reject-errors,no-param-reassign,
no-undef,function-paren-newline */
import axios from 'axios';

const state = {
  accessToken: null,
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
    return state.accessToken;
  },
};

const mutations = {
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },

  setCurrentUser(state, payload) {
    state.currentUser = payload;
  },
};

const actions = {
  loginWithFacebook({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      FB.login(
        (result) => {
          if (result.authResponse) {
            return axios
              .post('auth/facebook', {
                access_token: result.authResponse.accessToken,
              })
              .then((res) => {
                const token = res.headers['x-auth-token'];
                if (token) {
                  commit('setAccessToken', token);
                  localStorage.setItem('accessToken', token);
                  dispatch('getCurrentUser');
                }
                resolve(res);
              })
              .catch(() => reject());
          }
          reject();
        },
        { scope: 'public_profile,email' },
      );
    });
  },

  logout({ commit }) {
    commit('setAccessToken', null);
    commit('setCurrentUser', null);
    localStorage.removeItem('accessToken');
  },

  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) =>
      axios
        .get('users/current')
        .then((res) => {
          commit('setCurrentUser', res.data);
          resolve(res);
        })
        .catch(() => reject()),
    );
  },

  tryAutoLogin({ commit, dispatch }) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    commit('setAccessToken', accessToken);
    dispatch('getCurrentUser');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
