<template>
  <v-toolbar app>
    <v-toolbar-title>Tarpmiestinės kelionės</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>
        <v-icon class="mr-2">directions_car</v-icon>Kelionės
      </v-btn>

      <v-btn flat>
        <v-icon class="mr-2">person</v-icon>Prisijungti su Facebook
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
    logout() {
      this.$store.commit('logout');
    },
  },
};
</script>
