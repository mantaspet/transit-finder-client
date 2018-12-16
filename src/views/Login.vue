<template>
  <v-img
    :src="require('@/assets/login-bg.jpg')"
    height="100%"
    width="100%"
    style="position: fixed; text-align: center"
  >
    <v-layout v-if="!$store.getters.isAuthenticated" align-center justify-center fill-height>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-progress-linear
            v-show="$store.getters.isLoading"
            color="accent"
            class="progress-bar-small"
            indeterminate
          />
          <div class="text-xs-right">
            <LanguageSelector/>
          </div>
          <v-img :src="require('@/assets/logo-dark.png')" height="50" contain/>
          <v-form @submit.prevent>
            <v-card-text>
              <v-text-field
                v-model="authData.username"
                v-validate="'required'"
                :label="$t('username')"
                :error-messages="errors.collect('username')"
                prepend-icon="person"
                name="username"
                type="text"
                autofocus
              />
              <v-text-field
                v-model="authData.password"
                v-validate="'required'"
                :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                :error-messages="errors.collect('password')"
                :type="hidePassword ? 'password' : 'text'"
                :label="$t('password')"
                prepend-icon="lock"
                name="password"
                @click:append="hidePassword = !hidePassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" type="submit" block @click="login">{{ $t('login') }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-img>
</template>

<script>
import LanguageSelector from '../components/LanguageSelector.vue';

export default {
  name: 'Login',

  components: {
    LanguageSelector,
  },

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
