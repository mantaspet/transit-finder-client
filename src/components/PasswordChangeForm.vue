<template>
  <v-card class="elevation-0">
    <v-card-title class="title pb-0">
      {{ $t('password_change') }}
    </v-card-title>
    <v-form @submit.prevent>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="passwords.current_password"
              v-validate="'required'"
              :error-messages="[
                ...backendErrors.current_password,
                ...errors.collect('current_password'
              )]"
              :append-icon="hideCurrent ? 'visibility' : 'visibility_off'"
              :type="hideCurrent ? 'password' : 'text'"
              :label="$t('current_password')"
              name="current_password"
              autofocus
              @click:append="hideCurrent = !hideCurrent"
              @blur="clearErrors('current_password')"
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="passwords.new_password"
              v-validate="'required'"
              :error-messages="[...backendErrors.new_password, ...errors.collect('new_password')]"
              :append-icon="hideNew ? 'visibility' : 'visibility_off'"
              :type="hideNew ? 'password' : 'text'"
              :label="$t('new_password')"
              name="new_password"
              @click:append="hideNew = !hideNew"
              @blur="clearErrors('new_password')"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="requestPending"
          color="primary"
          type="submit"
          @click.native="changePassword"
        >
          {{ $t('save') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import formMixin from '../mixins/form-mixin';

export default {
  name: 'PasswordChangeForm',

  mixins: [formMixin],

  data() {
    return {
      hideNew: true,
      hideCurrent: true,
      requestPending: false,
      passwords: {
        current_password: '',
        new_password: '',
      },
      backendErrors: {
        current_password: [],
        new_password: [],
      },
    };
  },

  methods: {
    changePassword() {
      this.$validator.validate().then((passed) => {
        if (passed) {
          this.requestPending = true;
          this.$http.put('api/user/current/password', this.passwords).then(() => {
            this.$store.commit('openSnackbar', {
              text: this.$t('password_was_changed'),
            });
            this.passwords.current_password = '';
            this.passwords.new_password = '';
            this.requestPending = false;
          }).catch((error) => {
            this.handleBackendErrors(error);
          });
        }
      });
    },
  },
};
</script>

