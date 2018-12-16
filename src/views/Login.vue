<template>
  <!-- eslint-disable max-len -->
  <v-layout v-if="!$store.getters.isAuthenticated" align-center justify-center fill-height>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-progress-linear
          v-show="$store.getters.isLoading"
          color="accent"
          class="progress-bar-small"
          indeterminate
        />
        <v-card-title class="headline justify-center">Tarpmiestinės kelionės</v-card-title>
        <v-card-actions>
          <v-btn color="primary" type="submit" block @click="login">Prisijungti su Facebook</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      hidePassword: true,
      authData: {
        username: '',
        password: '',
      },
    };
  },

  created() {
    this.$store.commit('hideProgressBar');
  },

  methods: {
    login() {
      this.$validator.validate().then((passed) => {
        if (passed) {
          this.$store.dispatch('login', this.authData);
        }
      });
    },
  },
};
</script>

<style>
.v-image__image--cover {
  filter: brightness(50%);
}
</style>
