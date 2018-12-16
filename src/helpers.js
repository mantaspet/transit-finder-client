/* eslint-disable no-param-reassign,no-underscore-dangle */
import store from './store/index';

export default {
  helpers: {
    $isCurrentUser(id) {
      if (store.getters.currentUser) {
        return store.getters.currentUser._id === id;
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
