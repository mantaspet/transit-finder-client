/* eslint-disable no-param-reassign,global-require,import/no-unresolved */
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import posts from './posts';
import i18n from '../i18n/i18n-config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appSettings: {
      sidenavOpen: true,
    },
    confirmDialog: {
      isOpen: false,
    },
    snackbar: {
      isOpen: false,
    },
    isLoading: false,
    isTouchDevice: false,
  },

  getters: {
    appSettings(state) {
      return state.appSettings;
    },

    confirmDialog(state) {
      return state.confirmDialog;
    },

    snackbar(state) {
      return state.snackbar;
    },

    isLoading(state) {
      return state.isLoading;
    },

    isTouchDevice(state) {
      return state.isTouchDevice;
    },
  },

  mutations: {
    storeAppSettings(state, payload) {
      const appSettings = {
        sidenavOpen: payload.sidenavOpen === false ? payload.sidenavOpen : true,
      };
      Vue.set(state, 'appSettings', appSettings);
      localStorage.setItem('appSettings', JSON.stringify(state.appSettings));
    },

    updateAppSettings(state, payload) {
      if (payload) {
        state.appSettings[payload.key] = payload.value;
      }
      localStorage.setItem('appSettings', JSON.stringify(state.appSettings));
    },

    updateLocale(state, payload) {
      state.appSettings.locale = payload.locale;
      state.appSettings.localeIcon = payload.localeIcon;
      localStorage.setItem('appSettings', JSON.stringify(state.appSettings));
    },

    storeErrors(state, payload) {
      state.backendErrors = payload;
      console.log(payload);
      Object.keys(state.backendErrors).forEach((key) => {
        //this.backendErrors[key] = [];
      });
      //state.backendErrors = payload;
    },

    openConfirmDialog(state, payload) {
      if (!payload) {
        payload = {};
      }
      state.confirmDialog = {
        isOpen: true,
        cancelText: payload.cancelText ? payload.cancelText : i18n.t('cancel'),
        confirmText: payload.confirmText
          ? payload.confirmText
          : i18n.t('confirm'),
        body: payload.body ? payload.body : i18n.t('uncancellable_action'),
        title: payload.title ? payload.title : i18n.t('are_you_sure'),
      };
    },

    closeConfirmDialog(state) {
      state.confirmDialog.isOpen = false;
    },

    openSnackbar(state, payload) {
      state.snackbar = {
        isOpen: true,
        text: payload.text,
        action: payload.action,
        link: payload.link,
        timeout: payload.timeout,
      };
    },

    closeSnackbar(state) {
      state.snackbar.isOpen = false;
    },

    showProgressBar(state) {
      state.isLoading = true;
    },

    hideProgressBar(state) {
      state.isLoading = false;
    },

    setTouchDevice(state) {
      state.isTouchDevice = true;
    },
  },

  actions: {},

  modules: {
    auth,
    posts,
  },
});
