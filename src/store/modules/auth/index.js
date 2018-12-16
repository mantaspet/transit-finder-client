/* eslint-disable no-shadow */
import authActions from './actions';
import authMutations from './mutations';

const state = {
  accessToken: null,
  initialRoute: null,
  tokenExpiresAt: null,
  impersonatingAs: null,
  currentUser: null,
};

const getters = {
  auth(state) {
    return state;
  },

  isAuthenticated(state) {
    const now = new Date();
    return (
      state.accessToken && state.tokenExpiresAt && now.getTime() < state.tokenExpiresAt.getTime()
    );
  },

  impersonatingAs(state) {
    return state.impersonatingAs;
  },
};

const mutations = {
  ...authMutations,
};

const actions = {
  ...authActions,
};

export default {
  state,
  getters,
  mutations,
  actions,
};
