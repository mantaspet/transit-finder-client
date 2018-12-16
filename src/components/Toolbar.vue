<template>
  <!-- eslint-disable max-len -->
  <v-toolbar app>
    <v-toolbar-title>Tarpmiestinės kelionės</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="$router.push('/')">
        <v-icon class="mr-2">directions_car</v-icon>Kelionės
      </v-btn>

      <v-btn v-if="$store.getters.currentUser" flat @click="logout">
        <v-icon class="mr-2">exit_to_app</v-icon>Atsijungti
      </v-btn>

      <v-btn v-else flat @click="loginWithFacebook">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
          ></path>
        </svg>Prisijungti su Facebook
      </v-btn>
    </v-toolbar-items>

    <!-- <v-menu bottom lazy offset-y>
      <v-btn slot="activator" icon large>
        <v-icon large>account_circle</v-icon>
      </v-btn>

      <v-list class="pa-0">
        <template v-if="$store.getters.auth.currentUser">
          <v-list-tile>
            <v-subheader
              class="pa-0"
              style="margin: 0 auto"
            >{{ $store.getters.auth.currentUser.email }}</v-subheader>
          </v-list-tile>
        </template>
        <v-divider></v-divider>
        <v-list-tile @click="viewProfile">
          <v-list-tile-avatar>
            <v-icon>account_box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ $t('my_profile') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="$store.getters.impersonatingAs" @click="stopImpersonating">
          <v-list-tile-avatar>
            <v-icon>stop</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ $t('stop_impersonating') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ $t('logout') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>-->
  </v-toolbar>
</template>

<script>
/* eslint-disable global-require,import/no-unresolved */

export default {
  name: 'Toolbar',

  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },

  methods: {
    loginWithFacebook() {
      this.$store.dispatch('loginWithFacebook').then(() => {
        console.log('User has been logged in');
      });
    },

    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
