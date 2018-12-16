/* eslint-disable no-param-reassign */
import router from '../../../router/index';

export default {
  storeAuthData(state, authData) {
    state.accessToken = authData.accessToken;
    state.tokenExpiresAt = authData.tokenExpiresAt;
  },

  storeCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },

  setInitialRoute(state, route) {
    state.initialRoute = route;
  },

  logout(state) {
    state.accessToken = null;
    state.initialRoute = null;
    state.currentUser = null;
    state.impersonatingAs = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenAt');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('impersonator');
    router.replace('/login');
  },

  setImpersonatedUser(state, id) {
    state.impersonatingAs = id;
  },

  stopImpersonating(state, payload) {
    state.currentUser = payload.impersonator;
    state.impersonatingAs = null;
  },
};
