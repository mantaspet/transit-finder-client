/* eslint-disable no-param-reassign */
import store from './store/index';

export default {
  helpers: {
    $isAdmin() {
      if (store.getters.auth.currentUser) {
        return store.getters.auth.currentUser.role === 'admin';
      }
      return false;
    },

    $isCurrentUser(id) {
      if (store.getters.auth.currentUser) {
        return store.getters.auth.currentUser.id === id;
      }
      return false;
    },
  },

  registerHelpers(Vue) {
    Object.keys(this.helpers).forEach((helper) => {
      Vue.prototype[helper] = this.helpers[helper];
    });
  },
};
