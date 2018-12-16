<template>
  <v-app id="inspire">
    <!--<v-progress-linear-->
    <!--v-show="$store.getters.isLoading"-->
    <!--color="accent"-->
    <!--class="progress-bar-small"-->
    <!--indeterminate/>-->
    <NavigationDrawer v-if="$store.getters.auth.currentUser"/>
    <Toolbar v-if="$store.getters.auth.currentUser"/>
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
    <v-content v-if="showContent">
      <v-container class="pa-0 mx-0" fill-height fluid>
        <v-slide-y-transition mode="out-in">
          <router-view :key="$route.fullPath"/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue';
import Toolbar from './components/Toolbar.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
import Snackbar from './components/Snackbar.vue';

export default {
  components: {
    NavigationDrawer,
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
    this.addTouchListener();
    let settings = localStorage.getItem('appSettings');
    if (settings) {
      settings = JSON.parse(settings);
      this.$store.commit('storeAppSettings', settings);
      if (settings.locale) {
        this.$i18n.locale = settings.locale;
      }
    }
  },

  computed: {
    showContent() {
      return !!(this.$store.getters.auth.currentUser || this.$route.name === 'login');
    },
  },

  methods: {
    addTouchListener() {
      window.addEventListener('touchstart', () => {
        if (!this.$store.getters.isTouchDevice) {
          this.$store.commit('setTouchDevice');
        }
      });
    },
  },
};
</script>

<style>
html {
  overflow-y: auto;
}

#inspire {
  background: #f5f5f5;
}

.theme--light.v-table,
.theme--light.v-card,
.theme--light.v-list,
.theme--light.v-expansion-panel,
.theme--light.v-expansion-panel .v-expansion-panel__container {
  background-color: #f5f5f5;
}

.theme--light.v-btn {
  color: #757575;
}

.theme--light.v-card.darker-card > div {
  background: #eeeeee;
}

.v-navigation-drawer__border {
  display: none;
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

.row-detail-table {
  border-spacing: 0;
  background-color: #f0f0f0;
}

.row-actions {
  position: absolute;
  right: 0;
  padding: 0 14px;
  background: inherit;
  height: 48px;
  display: none;
  z-index: 2;
}

.table-row {
  position: relative;
}

.table-row:hover .row-actions {
  display: flex;
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
  padding-bottom: 85px;
}

.v-form > .container {
  padding: 8px;
}

.table-row:nth-child(4n + 1) {
  background: #e0e0e0;
}

td:first-child:not(.v-datatable__expand-col),
th:first-child {
  padding: 0 16px !important;
}

td.text-xs-right,
th.text-xs-right {
  padding: 0 16px 0 0 !important;
}

.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 16px !important;
}

.expanded-row-field {
  display: flex;
}

.v-datatable__progress th {
  padding: 0 !important;
}
</style>
