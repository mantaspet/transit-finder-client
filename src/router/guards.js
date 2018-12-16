import store from '../store/index';

export default {
  authGuard(to, from, next) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        next();
      } else {
        next('login');
      }
    }
  },

  loginGuard(to, from, next) {
    if (store.getters.isAuthenticated) {
      next(from.path);
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        next(false);
      } else {
        next();
      }
    }
  },

  adminGuard(to, from, next) {
    if (store.getters.auth.currentUser && store.getters.auth.currentUser.role === 'admin') {
      next();
    } else {
      next(false);
    }
  },
};
