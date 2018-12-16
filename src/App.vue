<template>
  <v-app id="inspire">
    <!--<v-progress-linear-->
    <!--v-show="$store.getters.isLoading"-->
    <!--color="accent"-->
    <!--class="progress-bar-small"-->
    <!--indeterminate/>-->
    <Toolbar/>
    <ConfirmDialog
      :isOpen="$store.getters.confirmDialog.isOpen"
      :title="$store.getters.confirmDialog.title"
      :body="$store.getters.confirmDialog.body"
      :cancelText="$store.getters.confirmDialog.cancelText"
      :confirmText="$store.getters.confirmDialog.confirmText"
    />
    <Snackbar
      :text="$store.getters.snackbar.text"
      :link="$store.getters.snackbar.link"
      :action="$store.getters.snackbar.action"
      :timeout="$store.getters.snackbar.timeout"
    />
    <v-content>
      <v-img
        :src="require('@/assets/login-bg.png')"
        height="100%"
        width="100%"
        style="position: fixed; text-align: center"
      >
        <v-container class="pa-0 mx-0" fill-height fluid>
          <v-slide-y-transition mode="out-in">
            <router-view :key="$route.fullPath"/>
          </v-slide-y-transition>
        </v-container>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
import Snackbar from './components/Snackbar.vue';

export default {
  components: {
    Toolbar,
    ConfirmDialog,
    Snackbar,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  created() {
    this.$store.dispatch('tryAutoLogin');
    let settings = localStorage.getItem('appSettings');
    if (settings) {
      settings = JSON.parse(settings);
      this.$store.commit('storeAppSettings', settings);
      if (settings.locale) {
        this.$i18n.locale = settings.locale;
      }
    }
  },
};
</script>

<style>
html {
  overflow-y: auto;
}

.container.fill-height {
  align-items: unset;
}

.alert-text {
  color: #ff5252 !important;
  font-weight: bold !important;
}

.success-text {
  color: #4caf50 !important;
  font-weight: bold !important;
}

.clickable {
  cursor: pointer !important;
}

.clickable .v-chip__content {
  cursor: pointer !important;
}

.default-cursor {
  cursor: default !important;
}

.progress-bar-small {
  position: absolute !important;
  top: -14px;
  height: 2px !important;
  z-index: 20;
}

.bottom-margin {
  margin-bottom: 90px;
}

.full-width {
  width: 100%;
}
</style>
